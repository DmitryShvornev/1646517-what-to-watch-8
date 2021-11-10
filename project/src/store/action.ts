import { ActionType, UpdateGenreAction, LoadFilmsAction } from '../types/action';
import { Film } from '../types/film';
import { AuthorizationStatus } from '../const';

export const updateGenre = (genre: string): UpdateGenreAction => ({
  type: ActionType.UpdateGenre,
  payload: genre,
});

export const loadFilms = (films: Film[]) : LoadFilmsAction => ({
  type: ActionType.LoadFilms,
  payload: films,
});

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);
