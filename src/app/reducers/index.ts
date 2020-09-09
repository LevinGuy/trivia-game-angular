import { ActionReducerMap } from '@ngrx/store';

import * as userReducer from './user/user.reducer';
import * as questionsReducer from './questions/questions.reducer';
import * as gameStatusReducer from './game-status/game-status.reducer';

import { UserState } from './user/user.reducer';
import { QuestionsState } from './questions/questions.reducer';
import { GameStatusState } from './game-status/game-status.reducer';

export interface GameState {
  user: UserState;
  questions: QuestionsState;
  gameStatus: GameStatusState;
}

export const stateReducers: ActionReducerMap<GameState> = {
  user: userReducer.reducer,
  questions: questionsReducer.reducer,
  gameStatus: gameStatusReducer.reducer
};
