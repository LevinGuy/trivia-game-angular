import { GameStatusActions, GameStatusActionTypes } from './game-status.reducer.actions';

export interface GameStatusState {
  status: string;
  score: number;
}

const initialState: GameStatusState = {
  status: 'NEW',
  score: 0
};

export function reducer(state: GameStatusState = initialState, action: GameStatusActions) {
  let newState;
  switch (action.type) {
    case GameStatusActionTypes.CLEAR:
      return initialState;
    case GameStatusActionTypes.SET_STATUS:
      newState = Object.assign({}, state);
      newState.status = action.status;
      return newState;
    case GameStatusActionTypes.ADD_SCORE: {
      newState = Object.assign({}, state);
      newState.score += action.amount;
      return newState;
    }
    default:
      return state;
  }
}
