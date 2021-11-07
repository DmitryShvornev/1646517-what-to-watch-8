import {Film} from './film';

export type State = {
  genre: string;
  films: Film[];
  filmsBuffer: Film[],
  titlePromo: string;
  genrePromo: string;
  yearPromo: number;
}
