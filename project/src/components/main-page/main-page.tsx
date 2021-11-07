/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import FilmsList from '../films-list/films-list';
import GenreList from '../genre-list/genre-list';
import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import { Actions } from '../../types/action';
import { updateGenre } from '../../store/action';
import ShowMoreButton from '../show-more-button/show-more-button';

const FILM_RENDER_COUNT = 8;

const mapStateToProps = ({genre, films, titlePromo, yearPromo, genrePromo, filmsBuffer}: State) => ({
  genre,
  films,
  filmsBuffer,
  titlePromo,
  yearPromo,
  genrePromo,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onChangeGenre(genre: string) {
    dispatch(updateGenre(genre));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


function MainPage(props: PropsFromRedux): JSX.Element {
  const { titlePromo, genrePromo, yearPromo, films, filmsBuffer, onChangeGenre, genre } = props;
  const history = useHistory();
  const [cardsCount, setCardsCount] = useState(FILM_RENDER_COUNT);
  const condition = !(cardsCount >= filmsBuffer.length);
  console.log(condition);
  console.log(cardsCount);
  const [showButton, setShowButton] = useState(condition);
  const onClick = () => history.push(AppRoute.Player);
  const onShowMoreClick = () => {
    setCardsCount(cardsCount + FILM_RENDER_COUNT);
    console.log(cardsCount);
    if (cardsCount + FILM_RENDER_COUNT >= filmsBuffer.length) {
      setShowButton(false);
    }
  };
  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{titlePromo}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genrePromo}</span>
                <span className="film-card__year">{yearPromo}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={onClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList films={films} dispatcher={onChangeGenre} currentGenre={genre}/>
          <FilmsList films={filmsBuffer.slice(0, Math.min(cardsCount, filmsBuffer.length))}/>
          <ShowMoreButton showButton={showButton} onButtonClick={onShowMoreClick}/>
        </section>
        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>

  );
}

export {MainPage};
export default connector(MainPage);
