import {Film} from './film';
import {CommentReview} from './comment';
import { AuthorizationStatus} from '../const';

export type State = {
  genre: string;
  films: Film[];
  filmsBuffer: Film[],
  similarFilms: Film[],
  commentsList: CommentReview[],
  currentFilm: Film,
  titlePromo: string;
  genrePromo: string;
  yearPromo: number;
  posterPromo: string;
  backgroundPromo: string;
  idPromo: number;
  isFavoritePromo: boolean;
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
  isFilmLoaded: boolean,
  userAvatar: string;
  favoriteFilms: Film[],
}
