/* eslint-disable jsx-a11y/anchor-is-valid */
import { useHistory } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { MouseEvent, useState } from 'react';
import Tabs from '../tabs/tabs';
import {State} from '../../types/state';
import FilmsList from '../films-list/films-list';
import { connect, ConnectedProps } from 'react-redux';


const mapStateToProps = ({currentFilm, similarFilms, authorizationStatus}: State) => ({
  currentFilm,
  similarFilms,
  authorizationStatus,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function MoviePage({ currentFilm, similarFilms, authorizationStatus }: PropsFromRedux): JSX.Element {
  const history = useHistory();
  const onClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    history.push(AppRoute.AddReview);
  };
  const [state, setState] = useState('Overview');
  const onOptionClick = (evt : MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const option = evt.currentTarget.getAttribute('data-option') || '';
    setState(option);
  };
  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={currentFilm.backgroundImage} alt={currentFilm.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <a href="main.html" className="logo__link">
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
            <div className="film-card__desc">
              <h2 className="film-card__title">{currentFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{currentFilm.genre}</span>
                <span className="film-card__year">{currentFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
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
                <a href="add-review.html" className="btn film-card__button" style={authorizationStatus === AuthorizationStatus.NoAuth ? {display: 'none'}:{}} onClick={onClick}>Add review
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={currentFilm.posterImage} alt={currentFilm.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className={`film-nav__item ${state === 'Overview' ? 'film-nav__item--active':''}`}>
                    <a href="#" data-option="Overview" className="film-nav__link" onClick={onOptionClick}>Overview</a>
                  </li>
                  <li className={`film-nav__item ${state === 'Details' ? 'film-nav__item--active':''}`}>
                    <a href="#" data-option="Details" className="film-nav__link" onClick={onOptionClick}>Details</a>
                  </li>
                  <li className={`film-nav__item ${state === 'Reviews' ? 'film-nav__item--active':''}`}>
                    <a href="#" data-option="Reviews" className="film-nav__link" onClick={onOptionClick}>Reviews</a>
                  </li>
                </ul>
              </nav>

              <Tabs option={state} film={currentFilm}/>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsList films={similarFilms}/>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
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
    </>
  );
}

export {MoviePage};
export default connector(MoviePage);
