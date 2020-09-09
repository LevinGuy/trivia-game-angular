import { Injectable } from '@angular/core';
import { Question } from '../models';
import { Store } from '@ngrx/store';
import { SetAnswer, NextQuestion } from '../reducers/questions/questions.reducer.actions';
import { getCurrentQuestion, hasMoreQuestions } from '../reducers/questions/questions.selectors';
import { map, catchError, take, mergeMap, tap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { getUserLives } from '../reducers/user/user.selectors';
import { Router } from '@angular/router';
import { getGameScore } from '../reducers/game-status/game-status.selectors';

@Injectable()
export class GameService {

  // public questions: Question[];
  // public currentQuestion = 0;
  // private lives = new Array(3);
  // private score = 0;

  constructor(private store: Store<any>, private router: Router) {

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
            if (lives !== 0 && hasMore) {
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
              this.router.navigateByUrl('/summary');
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
