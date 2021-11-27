import { useHistory, useParams } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { MouseEvent, useState, useEffect } from 'react';
import Tabs from '../tabs/tabs';
import {State} from '../../types/state';
import FilmsList from '../films-list/films-list';
import NotFound from '../not-found/not-found';
import { connect, ConnectedProps, useStore } from 'react-redux';
import {fetchFilmAction, fetchSimilarAction, fetchCommentsAction, changeFavoritesAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../types/action';
import { requireLogout } from '../../store/action';
import { Dispatch } from 'redux';
import { Actions } from '../../types/action';

const SIMILAR_COUNT = 4;


const mapStateToProps = ({currentFilm, similarFilms, authorizationStatus, userAvatar, films}: State) => ({
  currentFilm,
  similarFilms,
  authorizationStatus,
  userAvatar,
  films,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onLogout() {
    dispatch(requireLogout());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function MoviePage({ currentFilm, similarFilms, authorizationStatus,  userAvatar, onLogout, films}: PropsFromRedux): JSX.Element {
  const store = useStore();
  const { id } = useParams<{id?: string}>();
  useEffect(() => {
    (store.dispatch as ThunkAppDispatch)(fetchFilmAction(Number(id)));
    (store.dispatch as ThunkAppDispatch)(fetchSimilarAction(Number(id)));
    (store.dispatch as ThunkAppDispatch)(fetchCommentsAction(Number(id)));
  }, [id, store.dispatch]);
  const history = useHistory();
  const onClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    history.push(`${AppRoute.Film}/${currentFilm.id}/${AppRoute.AddReview}`);
  };
  const onListButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (authorizationStatus === AuthorizationStatus.Auth) {
      (store.dispatch as ThunkAppDispatch)(changeFavoritesAction(currentFilm.id, !currentFilm.isFavorite));
    } else {
      history.push(AppRoute.SignIn);
    }
  };
  const onPlayClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    history.push(`${AppRoute.Player}/${currentFilm.id}`);
  };
  const [state, setState] = useState('Overview');
  if (films.find((item) => item.id === Number(id)) === undefined && Number(id) !== -1) {
    return <NotFound/>;
  }
  const onOptionClick = (evt : MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const option = evt.currentTarget.getAttribute('data-option') || '';
    setState(option);
  };
  const onAuthClick = (evt : MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    if (authorizationStatus === AuthorizationStatus.Auth) {
      onLogout();
    }
    else {
      history.push(AppRoute.SignIn);
    }
  };
  const onLogoClick = (evt : MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    history.replace('/');
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
              <a href="main.html" className="logo__link" onClick={onLogoClick}>
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar" onClick={() => history.push(AppRoute.MyList)} style={authorizationStatus === AuthorizationStatus.Auth ? {} : {display : 'none'}}>
                  <img src={userAvatar} alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <a href="blank.html" className="user-block__link" onClick={onAuthClick}>{authorizationStatus === AuthorizationStatus.Auth ? 'Sign out':'Sign in'}</a>
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
                <button className="btn btn--play film-card__button" type="button" onClick={onPlayClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button" onClick={onListButtonClick}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref={ currentFilm.isFavorite ? '#in-list':'#add'}></use>
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
                    <a href="blank.html" data-option="Overview" className="film-nav__link" onClick={onOptionClick}>Overview</a>
                  </li>
                  <li className={`film-nav__item ${state === 'Details' ? 'film-nav__item--active':''}`}>
                    <a href="blank.html" data-option="Details" className="film-nav__link" onClick={onOptionClick}>Details</a>
                  </li>
                  <li className={`film-nav__item ${state === 'Reviews' ? 'film-nav__item--active':''}`}>
                    <a href="blank.html" data-option="Reviews" className="film-nav__link" onClick={onOptionClick}>Reviews</a>
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

          <FilmsList films={similarFilms.slice(0, SIMILAR_COUNT)}/>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light" onClick={onLogoClick}>
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
