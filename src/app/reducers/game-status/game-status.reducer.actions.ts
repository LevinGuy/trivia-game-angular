import { Action } from '@ngrx/store';

export enum GameStatusActionTypes {
  ADD_SCORE = '[GameStatus] Score Add',
  SET_STATUS = '[GameStatus] Set',
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

export class ClearGameStatus implements Action {
  readonly type = GameStatusActionTypes.CLEAR;
  constructor() { }
}

export type GameStatusActions = SetGameStatus | ClearGameStatus | AddScore;
