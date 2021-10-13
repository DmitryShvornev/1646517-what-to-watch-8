import FilmCard from '../film-card/film-card';
import { Films } from '../../types/film';
//import { useState } from 'react';

type FilmsListProps = {
  films: Films;
}

function FilmsList({films}: FilmsListProps): JSX.Element {
  //const [activeCard, setActiveCard] = useState(0);
  //onMouseEnter={(evt) => {setActiveCard(evt.target.key);}}
  return (
    <div className="catalog__films-list">
      { films.map((film) => (<FilmCard key={film.id} film={film} />))}
    </div>
  );
}

export default FilmsList;
