import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { QuestionsActionTypes, SetAnswer } from '../reducers/questions/questions.reducer.actions';
import { getCurrentQuestion } from '../reducers/questions/questions.selectors';
import { Question } from '../models';
import { AddScore } from '../reducers/game-status/game-status.reducer.actions';
import { SubstractLives } from '../reducers/user/user.reducer.actions';

@Injectable()
export class AnswerEffects {

  gameEffect$ = createEffect(() => this.actions$.pipe(
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

//   questionEffect$ = createEffect(() => this.actions$.pipe(
//     ofType(QuestionsActionTypes.NEXT_QUESTION),
//     mergeMap(() => this.store.select(getCurrentQuestion)
//       .pipe(
//         map((question: Question) => {
//             const selectedIndex = question.options.findIndex(x => x.selected === true);
//             if (selectedIndex < 0) {
//                 const index = question.options.findIndex(x => x.isAnswer === false);
//                 return new SetAnswer(index);
//             }
//         }),
//         catchError(() => EMPTY)
//       ))
//     )
//   );

  constructor(
    private actions$: Actions,
    private store: Store<any>
  ) {}
}
