import { Film } from './film';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from '../types/state';
import { AuthorizationStatus } from '../const';

export enum ActionType {
  UpdateGenre = 'data/updateGenre',
  LoadFilms = 'data/loadFilms',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RequireLogin = 'user/reqireLogin',
}

export type UpdateGenreAction = {
  type: ActionType.UpdateGenre;
  payload: string;
}

export type LoadFilmsAction = {
  type: ActionType.LoadFilms;
  payload: Film[];
}

export type RequireAuthorizationAction = {
  type: ActionType.RequireAuthorization;
  payload: AuthorizationStatus;
}

export type RequireLogoutAction = {
  type: ActionType.RequireLogout;
}

export type RequireLoginAction = {
  type: ActionType.RequireLogin;
  payload: string;
}


export type Actions = UpdateGenreAction | LoadFilmsAction | RequireAuthorizationAction | RequireLogoutAction | RequireLoginAction;
export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
