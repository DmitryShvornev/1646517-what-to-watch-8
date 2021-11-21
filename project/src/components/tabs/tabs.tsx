/* eslint-disable jsx-a11y/anchor-is-valid */
import { connect, ConnectedProps } from 'react-redux';
import { Film } from '../../types/film';
import {State} from '../../types/state';
import CommentCard from '../comment-card/comment-card';

type Props = {
  option: string;
  film: Film;
}

const mapStateToProps = ({commentsList}: State) => ({
  commentsList,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFromRedux & Props;

function Tabs({ option, film, commentsList }: ConnectedComponentProps): JSX.Element {
  let component : JSX.Element = (<div></div>);
  switch (option) {
    case 'Overview':
      component =  (
        <>
          <div className="film-rating">
            <div className="film-rating__score">{film.rating}</div>
            <p className="film-rating__meta">
              <span className="film-rating__level">Very good</span>
              <span className="film-rating__count">{film.scoresCount} ratings</span>
            </p>
          </div>

          <div className="film-card__text">
            <p>{film.description}</p>

            <p className="film-card__director"><strong>Director: {film.director}</strong></p>

            <p className="film-card__starring"><strong>Starring: {film.starring.join(', ')}</strong></p>
          </div>
        </>
      );
      break;
    case 'Details':
      component = (
        <div className="film-card__text film-card__row">
          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Director</strong>
              <span className="film-card__details-value">{film.director}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Starring</strong>
              <span className="film-card__details-value">
                {film.starring.join(', ')}
              </span>
            </p>
          </div>

          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Run Time</strong>
              <span className="film-card__details-value">{film.runTime}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Genre</strong>
              <span className="film-card__details-value">{film.genre}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Released</strong>
              <span className="film-card__details-value">{film.released}</span>
            </p>
          </div>
        </div>
      );
      break;
    case 'Reviews':
      component = (
        <div className="film-card__reviews film-card__row">
          <div className="film-card__reviews-col">
            {commentsList.map((item) => (<CommentCard key={item.id} comment={item}/>))}
          </div>
        </div>
      );
  }
  return component;
}

export {Tabs};
export default connector(Tabs);
