import { FilmCardProps } from '../../const';
import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../const';

function FilmCard({ film }: FilmCardProps): JSX.Element {
  const { name, posterImage } = film;
  const history = useHistory();
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={posterImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="blank.html" onClick={(evt) => {
          evt.preventDefault();
          history.push(AppRoute.Movie);
        }}
        >{name}
        </a>
      </h3>
    </article>
  );
}

export default FilmCard;
