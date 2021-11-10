import { ActionType, Actions } from '../types/action';
import { State } from '../types/state';
import { AuthorizationStatus } from '../const';

const initialState: State = {
  genre: 'All genres',
  films: [],
  filmsBuffer: [],
  titlePromo: 'The Grand Budapest Hotel',
  genrePromo: 'Drama',
  yearPromo: 2014,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
  let updatedList;
  switch (action.type) {
    case ActionType.UpdateGenre:
      updatedList = action.payload === 'All genres' ? state.films : state.films.filter((item) => item.genre === action.payload);
      return { ...state, genre: action.payload, filmsBuffer: updatedList };
    case ActionType.LoadFilms:
      return { ...state, films: action.payload, filmsBuffer: action.payload };
    case ActionType.RequireAuthorization:
      return { ...state, authorizationStatus: action.payload, isDataLoaded: true };
    case ActionType.RequireLogout:
      return { ...state, authorizationStatus: AuthorizationStatus.NoAuth };
    default:
      return state;
  }
};

export { reducer };
