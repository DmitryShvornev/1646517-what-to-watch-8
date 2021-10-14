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
import {Film} from '../../types/film';

type AppProps = {
  title: string;
  genre: string;
  year: number;
  films: Film[];
}

function App({ title, genre, year, films }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainPage title={title} genre={genre} year={year} films={films} />
        </Route>
        <Route exact path={AppRoute.Film}>
          <MoviePage film={films[0]}/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyList films={films}/>}
          authorizationStatus={AuthorizationStatus.NoAuth}
        />
        <Route exact path={AppRoute.Player}>
          <Player film={films[0]}/>
        </Route>
        <Route exact path={AppRoute.AddReview}>
          <Review film={films[0]}/>
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
