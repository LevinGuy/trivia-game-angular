import { Action } from '@ngrx/store';

export enum UserActionTypes {
  SUBSTRACT_LIVES = '[User] Lives Substract',
  SET_NAME = '[User] Name Set',
  CLEAR = '[User] Lives and Name Clear'
}

export class SubstractLives implements Action {
  readonly type = UserActionTypes.SUBSTRACT_LIVES;
  constructor() { }
}

export class SetName implements Action {
  readonly type = UserActionTypes.SET_NAME;
  constructor(public name: string) { }
}

export class ClearUser implements Action {
  readonly type = UserActionTypes.CLEAR;
  constructor() { }
}

export type UserActions = SubstractLives | ClearUser | SetName;
