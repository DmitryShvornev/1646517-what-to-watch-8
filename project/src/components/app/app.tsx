import MainPage from '../main-page/main-page';
import MoviePage from '../movie-page/movie-page';
import MyList from '../my-list/my-list';
import Player from '../player/player';
import Review from '../review/review';
import SignIn from '../sign-in/sign-in';
import NotFound from '../not-found/not-found';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../loading-screen/loading-screen';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({films, isDataLoaded, currentFilm}: State) => ({
  films,
  isDataLoaded,
  currentFilm,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;


function App(props: PropsFromRedux): JSX.Element {
  const {films, isDataLoaded, currentFilm} = props;

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainPage/>
        </Route>
        <Route exact path={AppRoute.Film} component={MoviePage}/>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyList films={films}/>}
        />
        <Route exact path={AppRoute.Player}>
          <Player film={currentFilm}/>
        </Route>
        <Route exact path={AppRoute.AddReview}>
          <Review film={currentFilm}/>
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <SignIn />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export {App};
export default connector(App);
