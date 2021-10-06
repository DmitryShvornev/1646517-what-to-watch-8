import MainPage from '../main-page/main-page';
import MoviePage from '../movie-page/movie-page';
import MyList from '../my-list/my-list';
import Player from '../player/player';
import Review from '../review/review';
import SignIn from '../sign-in/sign-in';
import NotFound from '../not-found/not-found';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  title: string;
  genre: string;
  year: number;
}

function App({ title, genre, year }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainPage title={title} genre={genre} year={year} />
        </Route>
        <Route exact path={AppRoute.Film}>
          <MoviePage />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <SignIn />}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
          <MyList/>
        </PrivateRoute>
        <Route exact path={AppRoute.Player}>
          <Player />
        </Route>
        <Route exact path={AppRoute.AddReview}>
          <Review />
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

export default App;
