import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getQuestions } from 'src/app/reducers/questions/questions.selectors';
import { tap, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { getGameStatus, getGameScore } from 'src/app/reducers/game-status/game-status.selectors';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  totalQuestions: number;
  correctQuestions: number;
  score: number;

  showLeaderBoard: boolean;
  leaderBoard = [];

  userForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2)])
  });

  constructor(private router: Router, private store: Store<any>) { }

  ngOnInit() {

    // first check that the game is not in status NEW (init)
    this.store.select(getGameStatus).pipe(take(1)).subscribe(status => {
      if (status === 'NEW') {
        this.router.navigate([''], { replaceUrl: false });
      }
    });

    // get the stats
    this.store.select(getQuestions).pipe(
      take(1),
      tap(questions => {
        this.totalQuestions = questions.length;
        this.correctQuestions = questions.filter(q => q.options.filter(o => o.isAnswer && o.selected).length > 0).length;
    })).subscribe();

    this.store.select(getGameScore).subscribe(score => this.score = score);

  }

  submitForm($ev, value: any) {
    $ev.preventDefault();

    // for (const c in this.userForm.controls) {
    //   this.userForm.controls[c].markAsTouched();
    // }

    if (this.userForm.valid) {
      let db = { leaderBoard : [] };
      if (localStorage.getItem('DB') !== null) {
        db = JSON.parse(localStorage.getItem('DB'));
      }

      db.leaderBoard.push( { name: value.name, score: this.score });
      db.leaderBoard = db.leaderBoard.sort(this.compareValues('score', 'desc')).slice(0, 10);
      localStorage.setItem('DB', JSON.stringify(db));

      this.showLeaderBoard = true;
      this.leaderBoard = db.leaderBoard;
    }
  }

  compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

}
