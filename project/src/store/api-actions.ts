import { ThunkActionResult } from '../types/action';
import { loadFilms, requireAuthorization, requireLogout, requireLogin, loadFilm, loadSimilar, loadComments, changeList, loadFavorites, loadPromo } from './action';
import { saveToken, dropToken, Token } from '../token';
import { APIRoute, AuthorizationStatus } from '../const';
import { Film } from '../types/film';
import { CommentReview } from '../types/comment';
import { AuthData } from '../types/auth-data';
import { CommentPost } from '../types/comment-post';
import { toast } from 'react-toastify';

const AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться';
const SEND_FAIL_MESSAGE = 'Не удалось отправить комментарий';

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

export const fetchFavoritesAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Film[]>(APIRoute.Favorite);
    dispatch(loadFavorites(data.map((item) => adaptToClient(item))));
  };

export const fetchFilmAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Film>(`${APIRoute.Films}/${id}`);
    dispatch(loadFilm(adaptToClient(data)));
  };

export const fetchPromoAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Film>('/promo');
    dispatch(loadPromo(adaptToClient(data)));
  };

export const fetchSimilarAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Film[]>(`${APIRoute.Films}/${id}/similar`);
    dispatch(loadSimilar(data.map((item) => adaptToClient(item))));
  };

export const fetchCommentsAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<CommentReview[]>(`comments/${id}`);
    dispatch(loadComments(data));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      toast.info(AUTH_FAIL_MESSAGE);
    }
  };

export const loginAction = ({ login: email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data: { token } } = await api.post<{ token: Token }>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(requireLogin(email));
  };

export const changeFavoritesAction = (id: number, condition: boolean): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.post(`${APIRoute.Favorite}/${id}/${Number(condition)}`)
      .then((response) => {
        dispatch(loadFilm(adaptToClient(response.data)));
        dispatch(changeList(condition));
      });
  };

export const postAction = (id: number, { rating, comment }: CommentPost): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data: { token } } = await api.post<{ token: Token }>(`/comments/${id}`, { comment, rating });
      saveToken(token);
      dispatch(fetchCommentsAction(id));
    } catch {
      toast.info(SEND_FAIL_MESSAGE);
    }
  };


export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
