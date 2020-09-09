import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/models';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  public question: Question;

  constructor() { }

  ngOnInit() {
    console.log(this.question);
  }

  selectAnswer(optionIndex: number) {
    console.log('Option Selected: ', this.question.options[optionIndex]);
  }

}
