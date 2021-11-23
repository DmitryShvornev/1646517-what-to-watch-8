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

const mapStateToProps = ({isDataLoaded}: State) => ({
  isDataLoaded,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;


function App(props: PropsFromRedux): JSX.Element {
  const {isDataLoaded} = props;

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
        <Route exact path={`${AppRoute.Film}/:id`} component={MoviePage}/>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyList/>}
        />
        <Route exact path={`${AppRoute.Player}/:id`}>
          <Player/>
        </Route>
        <Route exact path={`${AppRoute.Film}/:id/${AppRoute.AddReview}`}>
          <Review/>
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
