import { Film } from '../../types/film';
import { useHistory } from 'react-router-dom';
import { MouseEvent } from 'react';
import VideoPlayer from '../video-player/video-player';
import { useRef, useState, useEffect } from 'react';

type Props = {
  film: Film;
}

const PLAY_TIMEOUT = 1000;

function FilmCard({ film }: Props): JSX.Element {
  const { name, posterImage } = film;
  const history = useHistory();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setIsPlaying] = useState(false);

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
    history.push(`/films/${id}`);
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
