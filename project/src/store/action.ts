import { LoadFilmAction, ActionType, UpdateGenreAction, LoadFilmsAction, LoadSimilarAction, LoadCommentsAction} from '../types/action';
import { Film } from '../types/film';
import { CommentReview } from '../types/comment';
import { AuthorizationStatus } from '../const';

export const updateGenre = (genre: string): UpdateGenreAction => ({
  type: ActionType.UpdateGenre,
  payload: genre,
});

export const loadFilms = (films: Film[]) : LoadFilmsAction => ({
  type: ActionType.LoadFilms,
  payload: films,
});

export const loadFilm = (film: Film) : LoadFilmAction => ({
  type: ActionType.LoadFilm,
  payload: film,
});

export const loadSimilar = (films: Film[]) : LoadSimilarAction => ({
  type: ActionType.LoadSimilar,
  payload: films,
});

export const loadComments = (comments: CommentReview[]) : LoadCommentsAction => ({
  type: ActionType.LoadComments,
  payload: comments,
});

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogin = (login: string) => ({
  type: ActionType.RequireLogin,
  payload: login,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);
