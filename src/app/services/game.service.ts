import { Injectable } from '@angular/core';
import { Question } from '../models';

@Injectable()
export class GameService {

  public questions: Question[];
  public currentQuestion = 0;
  public lives = new Array(3);

  constructor() { }

  nextQuestion() {
    if (this.questions.length > this.currentQuestion + 1) {
      this.currentQuestion++;
    }
  }

  selectAnswer(optionIndex: any) {
    // first we deselect all the options
    const opts = this.questions[this.currentQuestion].options;
    opts.map(opt => opt.selected = false);
    opts[optionIndex].selected = true;

    // if the answer is wrong - remove a live
    if (!opts[optionIndex].isAnswer) {
      this.lives = new Array(--this.lives.length);
    }
  }

}
