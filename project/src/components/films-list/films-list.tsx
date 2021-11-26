import FilmCard from '../film-card/film-card';
import { Film } from '../../types/film';

type FilmsListProps = {
  films: Film[];
}

function FilmsList({films}: FilmsListProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {films === [] ? <p>Films are unavaliable</p> : <p></p>}
      { films.map((film) => (<FilmCard key={film.id}  film={film} />))}
    </div>
  );
}

export default FilmsList;
