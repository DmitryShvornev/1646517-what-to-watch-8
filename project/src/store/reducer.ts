import { ActionType, Actions } from '../types/action';
import { State } from '../types/state';
import { AuthorizationStatus } from '../const';

const initialState: State = {
  genre: 'All genres',
  films: [],
  filmsBuffer: [],
  similarFilms: [],
  commentsList: [],
  currentFilm: {
    id: -1,
    name: '',
    posterImage: '',
    previewImage: '',
    backgroundImage: '',
    backgroundColor: '',
    videoLink: '',
    previewVideoLink: '',
    description: '',
    rating: 0,
    scoresCount: 0,
    director: '',
    starring: [],
    runTime: 0,
    genre: '',
    released: 0,
    isFavorite: false,
  },
  titlePromo: 'The Grand Budapest Hotel',
  genrePromo: 'Drama',
  yearPromo: 2014,
  idPromo: 0,
  posterPromo: 'img/the-grand-budapest-hotel-poster.jpg',
  backgroundPromo: 'img/bg-the-grand-budapest-hotel.jpg',
  isFavoritePromo: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  userLogin: '',
  favoriteFilms: [],
};

const reducer = (state: State = initialState, action: Actions): State => {
  let updatedList;
  switch (action.type) {
    case ActionType.UpdateGenre:
      updatedList = action.payload === 'All genres' ? state.films : state.films.filter((item) => item.genre === action.payload);
      return { ...state, genre: action.payload, filmsBuffer: updatedList };
    case ActionType.LoadFilms:
      return { ...state, films: action.payload, filmsBuffer: action.payload };
    case ActionType.LoadFilm:
      return {...state, currentFilm: action.payload};
    case ActionType.LoadSimilar:
      return {...state, similarFilms: action.payload};
    case ActionType.LoadComments:
      return {...state, commentsList: action.payload};
    case ActionType.RequireAuthorization:
      return { ...state, authorizationStatus: action.payload, isDataLoaded: true };
    case ActionType.RequireLogout:
      return { ...state, authorizationStatus: AuthorizationStatus.NoAuth };
    case ActionType.RequireLogin:
      return {...state, userLogin: action.payload};
    case ActionType.ChangeList:
      return {...state, currentFilm: {...state.currentFilm, isFavorite : action.payload}};
    case ActionType.LoadFavorites:
      return {...state, favoriteFilms: action.payload};
    case ActionType.LoadPromo:
      return {...state, titlePromo: action.payload.name, genrePromo: action.payload.genre, yearPromo: action.payload.released, posterPromo: action.payload.posterImage, backgroundPromo: action.payload.backgroundImage, idPromo: action.payload.id, isFavoritePromo: action.payload.isFavorite};
    default:
      return state;
  }
};

export { reducer };
