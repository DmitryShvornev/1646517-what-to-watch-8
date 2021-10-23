import { Film } from '../../types/film';
import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../const';
import { MouseEvent } from 'react';
import VideoPlayer from '../video-player/video-player';

type Props = {
  film: Film;
  onMouseOver: () => void;
  onMouseOut: () => void;
  active: boolean;
}


function FilmCard({ active, film, onMouseOver, onMouseOut }: Props): JSX.Element {
  const { name, posterImage } = film;
  const history = useHistory();
  const onClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    history.push(AppRoute.Film);
  };
  return (
    <article className="small-film-card catalog__films-card" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <div className="small-film-card__image">
        <VideoPlayer src={film.previewVideoLink} poster={posterImage} play={active}/>
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="blank.html" onClick={onClick}>{name}
        </a>
      </h3>
    </article>
  );
}

export default FilmCard;
