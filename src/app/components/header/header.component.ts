import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Store } from '@ngrx/store';
import { getUserLives } from 'src/app/reducers/user/user.selectors';
import { getCurrentQuestionIndex, getQuestions } from 'src/app/reducers/questions/questions.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  lives: any;
  currentQuestionIndex: any;
  questionsTotal: any;

  constructor(public gameService: GameService, private store: Store<any>) { }

  ngOnInit() {
    this.store.select(getUserLives).subscribe(lives => this.lives = new Array(lives));
    this.store.select(getCurrentQuestionIndex).subscribe(index => this.currentQuestionIndex = (index + 1));
    this.store.select(getQuestions).subscribe(questions => this.questionsTotal = questions.length);
  }

}
