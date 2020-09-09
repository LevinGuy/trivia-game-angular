import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Question } from 'src/app/models';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {

  public showLoader = true;

  public remaining = 20;
  private _count = null;

  public answerStatusText: string;
  public answerSubmitted: boolean;
  public correct: boolean;
  public selectedOptionIndex = null;

  @Input()
  public set question(question: Question) {
    this.showLoader = true;
    this.selectedOptionIndex = null;
    this.answerStatusText = 'TIME IS UP!!! Prepare for the next question...';
    this.answerSubmitted = false;

    this._question = question;
    setTimeout(() => {
      this.showLoader = false;
      this.correct = null;
    }, 500); // this is for showing the user that question changed and GOOD or WRONG

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

  ngOnInit() { }

  countDown() {
    if (this.remaining === 0) {
      if (this.selectedOptionIndex !== null) {
        this.confirmAnswer();
      } else {
        this.nextQuestion.emit();
      }
    } else {
      this.remaining--;
    }
  }

  selectAnswer(optionIndex: number) {
    this.selectedOptionIndex = optionIndex;
  }

  confirmAnswer() {
    this.answerSubmitted = true;
    if (this._question.options[this.selectedOptionIndex].isAnswer) {
      this.correct = true;
      this.answerStatusText = 'GOOD JOB!!! Prepare for the next question...';
    } else {
      this.correct = false;
      this.answerStatusText = 'WRONG!!! Prepare for the next question...';
    }
    setTimeout(() => this.questionAnswered.emit(this.selectedOptionIndex), 3000);
  }

  skipQuestion() {
    this.nextQuestion.emit();
  }

  ngOnDestroy() {
    clearInterval(this._count);
  }

}
