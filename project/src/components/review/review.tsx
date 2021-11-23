/* eslint-disable jsx-a11y/anchor-is-valid */
import CommentForm from '../comment-form/comment-form';
import {State} from '../../types/state';
import { Dispatch } from 'redux';
import { Actions } from '../../types/action';
import { requireLogout } from '../../store/action';
import { connect, ConnectedProps, useStore} from 'react-redux';
import {fetchFilmAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../types/action';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const mapStateToProps = ({userLogin, currentFilm}: State) => ({
  userLogin,
  currentFilm,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onLogout() {
    dispatch(requireLogout());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Review(props : PropsFromRedux): JSX.Element {
  const {currentFilm, userLogin, onLogout} = props;
  const store = useStore();
  // eslint-disable-next-line
  const {id} : any = useParams();
  useEffect(() => {
    (store.dispatch as ThunkAppDispatch)(fetchFilmAction(Number(id)));
  }, [id, store.dispatch]);
  const onAuthClick = () => {
    onLogout();
  };
  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={currentFilm.backgroundImage} alt={currentFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="film-page.html" className="breadcrumbs__link">{currentFilm.name}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link" onClick={onAuthClick}>{userLogin}</a>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={currentFilm.posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327" />
        </div>
      </div>
      <div className="add-review">
        <CommentForm id={currentFilm.id}/>
      </div>
    </section>
  );
}

export {Review};
export default connector(Review);
