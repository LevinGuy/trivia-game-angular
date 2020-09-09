import { UserActions, UserActionTypes } from './user.reducer.actions';

export interface UserState {
  lives: number;
  name?: string;
}

const initialState: UserState = {
  lives: 3,
  name: null
};

export function reducer(state: UserState = initialState, action: UserActions) {
  let newState;
  switch (action.type) {
    case UserActionTypes.CLEAR:
      return initialState;
    case UserActionTypes.SET_NAME:
      newState = Object.assign({}, state);
      newState.name = Object.assign({}, action.name);
      return newState;
    case UserActionTypes.SUBSTRACT_LIVES: {
      newState = Object.assign({}, state);
      newState.lives--;
      return newState;
    }
    default:
      return state;
  }
}
