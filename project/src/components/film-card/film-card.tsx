import { Film } from '../../types/film';
import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../const';
import { MouseEvent } from 'react';
import VideoPlayer from '../video-player/video-player';
import { useRef } from 'react';

type Props = {
  film: Film;
}


function FilmCard({  film }: Props): JSX.Element {
  const { name, posterImage } = film;
  const history = useHistory();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const onClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    history.push(AppRoute.Film);
  };

  const onMouseOver = () => {
    videoRef.current?.play();
  };

  const onMouseOut = () => {
    videoRef.current?.load();
  };
  return (
    <article className="small-film-card catalog__films-card" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <div className="small-film-card__image">
        <VideoPlayer src={film.previewVideoLink} poster={posterImage} ref={videoRef}/>
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="blank.html" onClick={onClick}>{name}
        </a>
      </h3>
    </article>
  );
}

export default FilmCard;
