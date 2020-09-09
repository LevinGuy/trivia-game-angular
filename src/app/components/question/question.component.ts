import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public showLoader = true;

  @Input()
  public set question(question: Question) {
    this.showLoader = true;
    this._question = question;
    setTimeout(() => this.showLoader = false, 500); // this is for showing the user that question changed
  }

  public get question() {
    return this._question;
  }

  private _question: Question;

  @Output() questionAnswered: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this._question);
  }

  selectAnswer(optionIndex: number) {
    this.questionAnswered.emit(optionIndex);
  }

}
