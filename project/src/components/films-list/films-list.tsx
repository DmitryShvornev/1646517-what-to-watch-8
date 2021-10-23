import FilmCard from '../film-card/film-card';
import { Film } from '../../types/film';
import { useState } from 'react';

type FilmsListProps = {
  films: Film[];
}

function FilmsList({films}: FilmsListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState(-1);
  return (
    <div className="catalog__films-list">
      { films.map((film) => (<FilmCard key={film.id} active={film.id === activeCard} film={film} onMouseOver={() => setActiveCard(film.id)} onMouseOut={() => setActiveCard(-1)}/>))}
    </div>
  );
}

export default FilmsList;
