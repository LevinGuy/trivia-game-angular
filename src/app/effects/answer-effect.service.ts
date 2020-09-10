import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { QuestionsActionTypes } from '../reducers/questions/questions.reducer.actions';
import { getCurrentQuestion, getQuestions } from '../reducers/questions/questions.selectors';
import { Question } from '../models';
import { AddScore, EndGame, GameStatusActionTypes, SetGameStatus } from '../reducers/game-status/game-status.reducer.actions';
import { SubstractLives } from '../reducers/user/user.reducer.actions';
import { getGameStatus } from '../reducers/game-status/game-status.selectors';

@Injectable()
export class AnswerEffects {

  setAnswerEffect$ = createEffect(() => this.actions$.pipe(
    ofType(QuestionsActionTypes.SET_ANSWER),
    mergeMap(() => this.store.select(getCurrentQuestion)
      .pipe(
        take(1),
        map((question: Question) => {
            const result = question.options.filter(x => x.selected && x.isAnswer);
            if (result.length === 0) {
                return new SubstractLives();
            } else {
                return new AddScore(100);
            }
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  // gameEffect$ = createEffect(() => this.actions$.pipe(
  //   ofType(GameStatusActionTypes.SET_STATUS),
  //   mergeMap(() => this.store.select(getGameStatus)
  //     .pipe(
  //       take(1),
  //       map(status => {
  //           if (status === 'ENDED') {
  //               // update stats in DB
  //               this.store.select(getQuestions).subscribe(questions => {
  //                 console.log(questions);
  //               });
  //               return {}
  //           }
  //           return new SetGameStatus(status);
  //       }),
  //       catchError(() => EMPTY)
  //     ))
  //   )
  // );

  constructor(
    private actions$: Actions,
    private store: Store<any>
  ) {}
}
