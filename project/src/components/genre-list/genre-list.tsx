/* eslint-disable jsx-a11y/anchor-is-valid */
import { Film } from '../../types/film';
import { MouseEvent } from 'react';

type Props = {
  films: Film[];
  dispatcher: (arg : string) => void;
  currentGenre: string;
}

function GenreList({ films, dispatcher, currentGenre }: Props): JSX.Element {
  const genres = Array.from(new Set(films.map((item) => item.genre)));
  const onGenreClick = (evt : MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const genre = evt.currentTarget.getAttribute('data-genre') || '';
    dispatcher(genre);
  };
  return (
    <ul className="catalog__genres-list">
      <li className={`catalog__genres-item ${currentGenre === 'All genres' ? 'catalog__genres-item--active' : ''}`}>
        <a href="#" className="catalog__genres-link" data-genre="All genres" onClick={onGenreClick}>All genres</a>
      </li>
      {genres.map((item) => (
        <li key={item} className={`catalog__genres-item ${currentGenre === item ? 'catalog__genres-item--active' : ''}`}>
          <a href="#" className="catalog__genres-link" data-genre={item} onClick={onGenreClick}>{item}</a>
        </li>))}
    </ul>
  );
}

export default GenreList;
