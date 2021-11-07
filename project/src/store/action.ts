import { ActionType, UpdateGenreAction } from '../types/action';

export const updateGenre = (genre: string) : UpdateGenreAction => ({
  type: ActionType.UpdateGenre,
  payload: genre,
});

