import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public showLoader = true;

  public remaining = 20;
  private _count = null;

  public selectedOptionIndex = null;

  @Input()
  public set question(question: Question) {
    this.showLoader = true;
    this.selectedOptionIndex = null;

    this._question = question;
    setTimeout(() => this.showLoader = false, 500); // this is for showing the user that question changed

    // start the counter for the question
    clearInterval(this._count);
    this.remaining = 20;
    this._count = setInterval(this.countDown.bind(this), 1000);
  }

  public get question() {
    return this._question;
  }

  private _question: Question;

  @Output() questionAnswered: EventEmitter<any> = new EventEmitter();
  @Output() nextQuestion: EventEmitter<any> = new EventEmitter();

  constructor() { }

  countDown() {
    if (this.remaining === 0) {
      this.nextQuestion.emit();
    } else {
      this.remaining--;
    }
  }

  ngOnInit() {
    
  }

  selectAnswer(optionIndex: number) {
    this.selectedOptionIndex = optionIndex;
  }

  confirmAnswer() {
    this.questionAnswered.emit(this.selectedOptionIndex);
  }

  skipQuestion() {
    this.nextQuestion.emit();
  }

}
