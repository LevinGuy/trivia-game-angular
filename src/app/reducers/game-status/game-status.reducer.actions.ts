import { Action } from '@ngrx/store';

export enum GameStatusActionTypes {
  ADD_SCORE = '[GameStatus] Score Add',
  SET_STATUS = '[GameStatus] Set',
  END_GAME = '[GameStatus] End',
  CLEAR = '[GameStatus] Clear'
}

export class SetGameStatus implements Action {
  readonly type = GameStatusActionTypes.SET_STATUS;
  constructor(public status: string) { }
}

export class AddScore implements Action {
  readonly type = GameStatusActionTypes.ADD_SCORE;
  constructor(public amount: number) { }
}

export class EndGame implements Action {
  readonly type = GameStatusActionTypes.END_GAME;
  constructor() { }
}

export class ClearGameStatus implements Action {
  readonly type = GameStatusActionTypes.CLEAR;
  constructor() { }
}

export type GameStatusActions = SetGameStatus | ClearGameStatus | EndGame | AddScore;
