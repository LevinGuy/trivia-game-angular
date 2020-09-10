import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getQuestions } from 'src/app/reducers/questions/questions.selectors';
import { tap, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { getGameStatus } from 'src/app/reducers/game-status/game-status.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  ngDestroyed$ = new Subject();
  totalQuestions: number;
  correctQuestions: number;

  constructor(private router: Router, private store: Store<any>) { }

  ngOnInit() {

    // first check that the game is not in status NEW (init)
    this.store.select(getGameStatus).subscribe(status => {
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
  }

}
