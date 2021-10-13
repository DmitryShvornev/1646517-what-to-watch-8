import FilmCard from '../film-card/film-card';
import { Films } from '../../types/film';
import { useState } from 'react';

type FilmsListProps = {
  films: Films;
}

function FilmsList({films}: FilmsListProps): JSX.Element {
  const setActiveCard = useState(0)[1];
  return (
    <div className="catalog__films-list">
      { films.map((film) => (<FilmCard key={film.id} film={film} handler={() => setActiveCard(film.id)}/>))}
    </div>
  );
}

export default FilmsList;
