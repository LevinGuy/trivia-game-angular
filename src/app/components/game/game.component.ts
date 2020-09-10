import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { take, map, finalize, flatMap } from 'rxjs/operators';
import { Game } from 'src/app/models';
import { Observable } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SetQuestions } from 'src/app/reducers/questions/questions.reducer.actions';
import { getUserLives } from 'src/app/reducers/user/user.selectors';
import { getCurrentQuestionIndex } from 'src/app/reducers/questions/questions.selectors';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game$: Observable<Game>;
  currentQuestionIndex: number;
  totalQuestions: Array<number> = [];

  constructor(
    private dataService: DataService,
    private store: Store<any>,
    public gameService: GameService) { }

  ngOnInit() {
    this.game$ = this.dataService.get().pipe(flatMap((response) => {
      const data = new Game(response);
      this.totalQuestions = data.questions.map(q => q.options.findIndex(o => o.isAnswer));
      return this.gameService.startNewGame(data);
    }));

    this.store.select(getCurrentQuestionIndex).subscribe(index => this.currentQuestionIndex = (index + 1));
  }

  skipQuestion() {
    // we are going to select a wrong answer on purpose, so get random answer and exlude the correct one
    const index = this.randomExcluded(0, 4, this.totalQuestions[this.currentQuestionIndex]);
    this.onAnswerSelected(index);
  }

  onAnswerSelected(optionIndex) {
    this.gameService.selectAnswer(optionIndex);
    if (this.totalQuestions[this.currentQuestionIndex] === optionIndex) {
      this.totalQuestions[this.currentQuestionIndex] = -1; // correct answer - for display only
    }
    this.gameService.nextQuestion();
  }

  randomExcluded(min, max, excluded) {
      let n = Math.floor(Math.random() * (max - min) + min);
      if (n === excluded && (n + 1) !== max) {
        n++;
      } else if (n === excluded && (n - 1) !== min) {
        n--;
      }
      return n;
  }

}
