import { ThunkActionResult } from '../types/action';
import { loadFilms, requireAuthorization, requireLogout } from './action';
import { saveToken, dropToken, Token } from '../token';
import { APIRoute, AuthorizationStatus } from '../const';
import { Film } from '../types/film';
import { AuthData } from '../types/auth-data';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function adaptToClient(film: any) {
  const adaptedFilm = Object.assign(
    {},
    film,
    {
      posterImage: film['poster_image'],
      previewImage: film['preview_image'],
      backgroundImage: film['background_image'],
      backgroundColor: film['background_color'],
      videoLink: film['video_link'],
      previewVideoLink: film['preview_video_link'],
      scoresCount: film['scores_count'],
      runTime: film['run_time'],
      isFavorite: film['is_favorite'],
    },
  );
  delete adaptedFilm['poster_image'];
  delete adaptedFilm['preview_image'];
  delete adaptedFilm['background_image'];
  delete adaptedFilm['background_color'];
  delete adaptedFilm['video_link'];
  delete adaptedFilm['preview_video_link'];
  delete adaptedFilm['scores_count'];
  delete adaptedFilm['run_time'];
  delete adaptedFilm['is_favorite'];
  return adaptedFilm;
}

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Film[]>(APIRoute.Films);
    dispatch(loadFilms(data.map((item) => adaptToClient(item))));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      });
  };

export const loginAction = ({ login: email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data: { token } } = await api.post<{ token: Token }>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };


export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
