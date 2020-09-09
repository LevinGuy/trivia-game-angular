import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { take, map, finalize } from 'rxjs/operators';
import { Game } from 'src/app/models';
import { Observable } from 'rxjs';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  game$: Observable<Game>;

  progress: number;
  maxWrongAnswers: number;

  private _timer: any;

  constructor(private _dataService: DataService, public gameService: GameService) { }


  ngOnInit() {

    this.game$ = this._dataService.get().pipe(map((response) => {
      const data = new Game(response);
      this.maxWrongAnswers = 3;
      this.progress = Math.round(100 / data.questions.length);
      // this._timer = setInterval(this.nextQuestion.bind(this), 5000);

      this.gameService.questions = data.questions;
      return data;
    }));
  }

  nextQuestion() {
    if (this.gameService.questions.length > this.gameService.currentQuestion + 1) {
      this.gameService.nextQuestion();
      this.progress = Math.round(100 / (this.gameService.questions.length / (this.gameService.currentQuestion + 1)));
    } else {
      console.log(this.game$);
    }
  }

  onAnswerSelected(optionIndex) {
    this.gameService.selectAnswer(optionIndex);
    this.nextQuestion();
  }

  ngOnDestroy(): void {
    // this._timer = null;
  }
}
