import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  /* example
    {
      "response_code": 0,
      "results": [{
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "medium",
        "question": "The name of technology company HP stands for what?",
        "correct_answer": "Hewlett-Packard",
        "incorrect_answers": ["Howard Packmann", "Husker-Pollosk", "Hellman-Pohl"]
      }]
    }
  */
  get() {
    return this.http.get('https://opentdb.com/api.php?amount=10&type=multiple');
  }

}
