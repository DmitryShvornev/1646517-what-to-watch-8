import {Film} from './film';
import { AuthorizationStatus} from '../const';

export type State = {
  genre: string;
  films: Film[];
  filmsBuffer: Film[],
  titlePromo: string;
  genrePromo: string;
  yearPromo: number;
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
  userLogin: string;
}
