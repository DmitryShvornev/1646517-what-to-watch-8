/* eslint-disable jsx-a11y/anchor-is-valid */
import FilmsList from '../films-list/films-list';
import {State} from '../../types/state';
import { Dispatch } from 'redux';
import { Actions, ThunkAppDispatch } from '../../types/action';
import { requireLogout } from '../../store/action';
import { connect, ConnectedProps, useStore} from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { MouseEvent, useEffect } from 'react';
import { useHistory } from 'react-router';
import { fetchFavoritesAction } from '../../store/api-actions';


const mapStateToProps = ({userLogin, favoriteFilms, authorizationStatus, userAvatar}: State) => ({
  userLogin,
  userAvatar,
  favoriteFilms,
  authorizationStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onLogout() {
    dispatch(requireLogout());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function MyList(props : PropsFromRedux): JSX.Element {
  const {favoriteFilms, onLogout, userLogin, userAvatar, authorizationStatus} = props;
  const history = useHistory();
  const store = useStore();
  const onAuthClick = () => {
    onLogout();
  };
  useEffect(() => {
    (store.dispatch as ThunkAppDispatch)(fetchFavoritesAction());
  });
  const onLogoClick = (evt : MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    history.replace('/');
  };
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <a href="main.html" className="logo__link" onClick={onLogoClick}>
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar" style={authorizationStatus === AuthorizationStatus.Auth ? {} : {display : 'none'}}>
              <img src={userAvatar} alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <a className="user-block__link" onClick={onAuthClick}>{userLogin}</a>
          </li>
        </ul>
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmsList films={favoriteFilms}/>
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
  );
}

export {MyList};
export default connector(MyList);
