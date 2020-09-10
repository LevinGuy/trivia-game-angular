import { Injectable } from '@angular/core';
import { Question, Game } from '../models';
import { Store } from '@ngrx/store';
import { SetAnswer, NextQuestion, SetQuestions, ClearQuestions } from '../reducers/questions/questions.reducer.actions';
import { getCurrentQuestion, hasMoreQuestions } from '../reducers/questions/questions.selectors';
import { map, catchError, take, mergeMap, tap } from 'rxjs/operators';
import { EMPTY, Observable, empty, of } from 'rxjs';
import { getUserLives } from '../reducers/user/user.selectors';
import { Router } from '@angular/router';
import { getGameScore } from '../reducers/game-status/game-status.selectors';
import { ClearGameStatus, SetGameStatus } from '../reducers/game-status/game-status.reducer.actions';
import { ClearUser } from '../reducers/user/user.reducer.actions';

@Injectable()
export class GameService {

  constructor(private store: Store<any>, private router: Router) {
  }

  startNewGame(data: Game): Observable<Game> {
    // reset the store
    this.store.dispatch(new ClearGameStatus());
    this.store.dispatch(new ClearQuestions());
    this.store.dispatch(new ClearUser());

    // set the game status to STARTED and load questions
    this.store.dispatch(new SetGameStatus('STARTED'));
    this.store.dispatch(new SetQuestions(data.questions));

    return of(data);
  }

  getScore(): Observable<number> {
    return this.store.select(getGameScore);
  }

  getCurrentQuestion(): Observable<Question> {
    return this.store.select(getCurrentQuestion);
  }

  nextQuestion() {

    this.store.select(getUserLives).pipe(
      take(1),
      mergeMap(lives => {
        return this.store.select(hasMoreQuestions).pipe(
          take(1),
          mergeMap(hasMore => {
            if (lives > 0 && hasMore) {
              return this.store.select(getCurrentQuestion).pipe(
                take(1),
                map((question: Question) => {
                    const selectedIndex = question.options.findIndex(x => x.selected === true);
                    if (selectedIndex < 0) {
                        const index = question.options.findIndex(x => x.isAnswer === false);
                        this.store.dispatch(new SetAnswer(index));
                    }
                    this.store.dispatch(new NextQuestion());
                })
              );
            } else {
              this.store.dispatch(new SetGameStatus('ENDED'));
              this.router.navigate(['/summary'], { replaceUrl: true }); // replacing history so that back will not work
              return of({});
            }
          })
        );
      })
    ).subscribe();
  }

  selectAnswer(optionIndex: any) {
    this.store.dispatch(new SetAnswer(optionIndex));
  }

}
