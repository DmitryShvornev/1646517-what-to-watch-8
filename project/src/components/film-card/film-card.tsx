import { Film } from '../../types/film';
import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../const';
import { MouseEvent } from 'react';

type Props = {
  film: Film;
  onMouseEnter: () => void;
}


function FilmCard({ film, onMouseEnter }: Props): JSX.Element {
  const { name, posterImage } = film;
  const history = useHistory();
  const onClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    history.push(AppRoute.Film);
  };
  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={onMouseEnter}>
      <div className="small-film-card__image">
        <img src={posterImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="blank.html" onClick={onClick}>{name}
        </a>
      </h3>
    </article>
  );
}

export default FilmCard;
