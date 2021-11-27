import React, { useEffect, useState, MouseEvent } from 'react';
import FilmsList from '../films-list/films-list';
import GenreList from '../genre-list/genre-list';
import { useHistory } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, FILM_RENDER_COUNT } from '../../const';
import { Dispatch } from 'redux';
import { connect, ConnectedProps, useStore } from 'react-redux';
import { State } from '../../types/state';
import { Actions, ThunkAppDispatch } from '../../types/action';
import { updateGenre, requireLogout } from '../../store/action';
import ShowMoreButton from '../show-more-button/show-more-button';
import { changeFavoritesAction, fetchPromoAction } from '../../store/api-actions';

const mapStateToProps = ({genre, films, titlePromo, yearPromo, genrePromo, filmsBuffer, authorizationStatus, isDataLoaded, posterPromo, backgroundPromo, idPromo, isFavoritePromo, userAvatar}: State) => ({
  genre,
  films,
  filmsBuffer,
  idPromo,
  isFavoritePromo,
  titlePromo,
  yearPromo,
  genrePromo,
  posterPromo,
  backgroundPromo,
  authorizationStatus,
  isDataLoaded,
  userAvatar,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onLogout() {
    dispatch(requireLogout());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


function MainPage(props: PropsFromRedux): JSX.Element {
  const { idPromo, isFavoritePromo, titlePromo, genrePromo, yearPromo, posterPromo, backgroundPromo, films, filmsBuffer, genre, authorizationStatus, isDataLoaded, onLogout,  userAvatar } = props;
  const history = useHistory();
  const [cardsCount, setCardsCount] = useState(FILM_RENDER_COUNT);
  const condition = Boolean(!(cardsCount >= filmsBuffer.length) || isDataLoaded);
  const [showButton, setShowButton] = useState(condition);
  const store = useStore();
  useEffect(() => {
    (store.dispatch as ThunkAppDispatch)(fetchPromoAction());
  }, [store.dispatch]);
  const onClick = () => history.push(`${AppRoute.Player}/${idPromo}`);
  const onListButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (authorizationStatus === AuthorizationStatus.Auth) {
      (store.dispatch as ThunkAppDispatch)(changeFavoritesAction(idPromo, !isFavoritePromo));
    } else {
      history.push(AppRoute.SignIn);
    }
  };
  const onChangeGenre = (newGenre: string) => {
    (store.dispatch as ThunkAppDispatch)(updateGenre(newGenre));
    setCardsCount(FILM_RENDER_COUNT);
    setShowButton(true);
  };
  const onShowMoreClick = () => {
    setCardsCount(cardsCount + FILM_RENDER_COUNT);
    if (cardsCount + FILM_RENDER_COUNT >= filmsBuffer.length) {
      setShowButton(false);
    }
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
  };
  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundPromo} alt="Promo film background" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link" href="blank.html" onClick={onLogoClick}>
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
              <a className="user-block__link" href="blank.html" onClick={onAuthClick}>{authorizationStatus === AuthorizationStatus.Auth ? 'Sign out':'Sign in'}</a>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={posterPromo} alt="Promo film poster" width="218" height="327" />
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
                <button className="btn btn--list film-card__button" type="button" onClick={onListButtonClick}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref={ isFavoritePromo ? '#in-list':'#add'}></use>
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
            <a className="logo__link logo__link--light" href="blank.html" onClick={onLogoClick}>
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
