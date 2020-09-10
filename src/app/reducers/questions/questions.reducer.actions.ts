import { Action } from '@ngrx/store';
import { Question } from 'src/app/models';

export enum QuestionsActionTypes {
  SET_CURRENT_INDEX = '[Questions] Set Current Index',
  SET_QUESTIONS = '[Questions] Set',
  NEXT_QUESTION = '[Questions] Next',
  SET_ANSWER = '[Questions] Answer',
  CLEAR = '[Questions] Clear'
}

export class SetQuestions implements Action {
  readonly type = QuestionsActionTypes.SET_QUESTIONS;
  constructor(public questions: Question[]) { }
}

export class SetCurrentIndex implements Action {
  readonly type = QuestionsActionTypes.SET_CURRENT_INDEX;
  constructor(public index: number) { }
}

export class NextQuestion implements Action {
  readonly type = QuestionsActionTypes.NEXT_QUESTION;
  constructor() { }
}

export class SetAnswer implements Action {
  readonly type = QuestionsActionTypes.SET_ANSWER;
  constructor(public optionIndex: number) { }
}

export class ClearQuestions implements Action {
  readonly type = QuestionsActionTypes.CLEAR;
  constructor() { }
}

export type QuestionsActions = SetQuestions | NextQuestion | SetAnswer | ClearQuestions | SetCurrentIndex;
