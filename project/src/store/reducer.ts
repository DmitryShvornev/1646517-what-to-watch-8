import {ActionType, Actions} from '../types/action';
import {State} from '../types/state';
import {films} from '../mocks/films';

const initialState : State = {
  genre: 'All genres',
  films: films,
  filmsBuffer: films,
  titlePromo: 'The Grand Budapest Hotel',
  genrePromo: 'Drama',
  yearPromo: 2014,
};

const reducer = (state : State = initialState, action: Actions) : State => {
  let updatedList;
  switch(action.type) {
    case ActionType.UpdateGenre:
      updatedList = action.payload === 'All genres' ? state.films : state.films.filter((item) => item.genre === action.payload);
      return {...state, genre: action.payload, filmsBuffer: updatedList};
    default:
      return state;
  }
};

export {reducer};
