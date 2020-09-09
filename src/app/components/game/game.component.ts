import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { take, map, finalize } from 'rxjs/operators';
import { Game } from 'src/app/models';
import { Observable } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SetQuestions } from 'src/app/reducers/questions/questions.reducer.actions';
import { getUserLives } from 'src/app/reducers/user/user.selectors';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game$: Observable<Game>;
  progress: number;
  lives: number;


  constructor(
    private _dataService: DataService,
    private _router: Router,
    private store: Store<any>,
    public gameService: GameService) { }

  ngOnInit() {
    this.game$ = this._dataService.get().pipe(map((response) => {
      const data = new Game(response);
      this.progress = Math.round(100 / data.questions.length);
      this.store.dispatch(new SetQuestions(data.questions));
      return data;
    }));
  }

  nextQuestion() {
    this.gameService.nextQuestion();
  }

  onAnswerSelected(optionIndex) {
    this.gameService.selectAnswer(optionIndex);
    this.nextQuestion();
  }

}
