import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Store } from '@ngrx/store';
import { getUserLives } from 'src/app/reducers/user/user.selectors';
import { getCurrentQuestionIndex, getQuestions } from 'src/app/reducers/questions/questions.selectors';
import { Subscription, Subject, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { getGameStatus } from 'src/app/reducers/game-status/game-status.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  lives$: Observable<Array<number>>;
  currentQuestionIndex$: Observable<number>;
  questionsTotal$: Observable<number>;
  gameStatus$: Observable<string>;

  constructor(public gameService: GameService, private store: Store<any>) { }

  ngOnInit() {
    this.lives$ = this.store.select(getUserLives).pipe(map(lives => new Array(lives)));
    this.currentQuestionIndex$ = this.store.select(getCurrentQuestionIndex).pipe(map(index => (++index)));
    this.questionsTotal$ = this.store.select(getQuestions).pipe(map(questions => questions.length));
    this.gameStatus$ = this.store.select(getGameStatus);
  }

}
