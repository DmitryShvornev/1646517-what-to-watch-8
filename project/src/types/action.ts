import { Film } from './film';
import { CommentReview } from './comment';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from '../types/state';
import { AuthorizationStatus } from '../const';

export enum ActionType {
  UpdateGenre = 'data/updateGenre',
  LoadFilms = 'data/loadFilms',
  LoadFilm = 'data/loadFilm',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RequireAvatar = 'user/reqireAvatar',
  LoadSimilar = 'data/loadSimilar',
  LoadComments = 'data/loadComments',
  ChangeList = 'user/changeList',
  LoadFavorites = 'data/loadFavorites',
  LoadPromo = 'data/loadPromo',
}

export type LoadPromoAction = {
  type: ActionType.LoadPromo;
  payload: Film;
}

export type ChangeListAction = {
  type: ActionType.ChangeList;
  payload: boolean;
}

export type UpdateGenreAction = {
  type: ActionType.UpdateGenre;
  payload: string;
}

export type LoadFilmsAction = {
  type: ActionType.LoadFilms;
  payload: Film[];
}

export type LoadFavoritesAction = {
  type: ActionType.LoadFavorites;
  payload: Film[];
}

export type LoadFilmAction = {
  type: ActionType.LoadFilm;
  payload: Film;
}

export type LoadSimilarAction = {
  type: ActionType.LoadSimilar;
  payload: Film[];
}

export type RequireAuthorizationAction = {
  type: ActionType.RequireAuthorization;
  payload: AuthorizationStatus;
}

export type RequireLogoutAction = {
  type: ActionType.RequireLogout;
}

export type RequireAvatarAction = {
  type: ActionType.RequireAvatar;
  payload: string;
}

export type LoadCommentsAction = {
  type: ActionType.LoadComments;
  payload: CommentReview[];
}


export type Actions = UpdateGenreAction | LoadFilmsAction | RequireAuthorizationAction | RequireLogoutAction |  RequireAvatarAction | LoadFilmAction | LoadSimilarAction | LoadCommentsAction | ChangeListAction | LoadFavoritesAction | LoadPromoAction;
export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
