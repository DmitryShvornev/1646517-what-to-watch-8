import { useState, ChangeEvent, FormEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { postAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../types/action';
import { CommentPost } from '../../types/comment-post';
import { useHistory } from 'react-router-dom';

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmit(id : number, commentPost: CommentPost) {
    dispatch(postAction(id, commentPost));
  },
});

type Props = {
  id: number;
}

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFromRedux & Props;

function CommentForm(props: ConnectedComponentProps): JSX.Element {
  const [state, setState] = useState('');
  const [starValue, setStarValue] = useState(8);
  const {onSubmit, id} = props;
  const history = useHistory();
  const onChangeHandler = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setState(target.value);
  };
  const onChangeStarHandler = ({target}: ChangeEvent<HTMLInputElement>) => {
    setStarValue(Number(target.value));
  };
  const onSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(id, {
      comment: state,
      rating: starValue,
    });
    history.goBack();
  };
  return (
    <form action="#" className="add-review__form" onSubmit={onSubmitHandler}>
      <div className="rating">
        <div className="rating__stars">
          <input className="rating__input" id="star-10" type="radio" name="rating" value="10" onChange={onChangeStarHandler}/>
          <label className="rating__label" htmlFor="star-10">Rating 10</label>

          <input className="rating__input" id="star-9" type="radio" name="rating" value="9" onChange={onChangeStarHandler}/>
          <label className="rating__label" htmlFor="star-9">Rating 9</label>

          <input className="rating__input" id="star-8" type="radio" name="rating" value="8" defaultChecked onChange={onChangeStarHandler}/>
          <label className="rating__label" htmlFor="star-8">Rating 8</label>

          <input className="rating__input" id="star-7" type="radio" name="rating" value="7" onChange={onChangeStarHandler}/>
          <label className="rating__label" htmlFor="star-7">Rating 7</label>

          <input className="rating__input" id="star-6" type="radio" name="rating" value="6" onChange={onChangeStarHandler}/>
          <label className="rating__label" htmlFor="star-6">Rating 6</label>

          <input className="rating__input" id="star-5" type="radio" name="rating" value="5" onChange={onChangeStarHandler}/>
          <label className="rating__label" htmlFor="star-5">Rating 5</label>

          <input className="rating__input" id="star-4" type="radio" name="rating" value="4" onChange={onChangeStarHandler}/>
          <label className="rating__label" htmlFor="star-4">Rating 4</label>

          <input className="rating__input" id="star-3" type="radio" name="rating" value="3" onChange={onChangeStarHandler} />
          <label className="rating__label" htmlFor="star-3">Rating 3</label>

          <input className="rating__input" id="star-2" type="radio" name="rating" value="2" onChange={onChangeStarHandler}/>
          <label className="rating__label" htmlFor="star-2">Rating 2</label>

          <input className="rating__input" id="star-1" type="radio" name="rating" value="1" onChange={onChangeStarHandler}/>
          <label className="rating__label" htmlFor="star-1">Rating 1</label>
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" onChange={
          onChangeHandler
        }
        value={state}
        >
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
}

export {CommentForm};
export default connector(CommentForm);
