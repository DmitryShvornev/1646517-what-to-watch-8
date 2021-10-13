import {Film} from './types/film';

export enum AppRoute {
  SignIn = '/login',
  Main = '/',
  MyList = '/mylist',
  AddReview = '/films/:id/review',
  Movie = '/films/:id',
  Player = '/player/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export type FilmCardProps = {
  film: Film;
}
