import { Film } from '../../types/film';
import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../const';
import { MouseEvent } from 'react';
import VideoPlayer from '../video-player/video-player';
import { useRef, useState, useEffect } from 'react';
import { useStore } from 'react-redux';
import {fetchCommentsAction, fetchFilmAction, fetchSimilarAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../types/action';

type Props = {
  film: Film;
}

const PLAY_TIMEOUT = 1000;

function FilmCard({ film }: Props): JSX.Element {
  const { name, posterImage } = film;
  const history = useHistory();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setIsPlaying] = useState(false);
  const store = useStore();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (playing) {
      timeout = setTimeout(() => videoRef.current?.play(), PLAY_TIMEOUT);
      return () => {
        clearTimeout(timeout);
      };
    }
    videoRef.current?.load();
  }, [playing]);

  const onClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const id = evt.currentTarget.getAttribute('data-id');
    (store.dispatch as ThunkAppDispatch)(fetchFilmAction(Number(id)));
    (store.dispatch as ThunkAppDispatch)(fetchSimilarAction(Number(id)));
    (store.dispatch as ThunkAppDispatch)(fetchCommentsAction(Number(id)));
    history.push(AppRoute.Film);
  };

  const onMouseOver = () => setIsPlaying(true);

  const onMouseOut = () => setIsPlaying(false);

  return (
    <article className="small-film-card catalog__films-card" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <div className="small-film-card__image">
        <VideoPlayer src={film.previewVideoLink} poster={posterImage} ref={videoRef} />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="blank.html" data-id={film.id} onClick={onClick}>{name}
        </a>
      </h3>
    </article>
  );
}

export default FilmCard;
