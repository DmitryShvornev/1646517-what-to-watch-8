export enum ActionType {
  UpdateGenre = 'updateGenre',
}

export type UpdateGenreAction = {
  type: ActionType.UpdateGenre;
  payload: string;
}


export type Actions =  UpdateGenreAction;
