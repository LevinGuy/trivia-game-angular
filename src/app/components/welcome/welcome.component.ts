import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SetGameStatus, ClearGameStatus } from 'src/app/reducers/game-status/game-status.reducer.actions';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router, private store: Store<any>) { }

  ngOnInit() {
  }

  start() {
    this.router.navigate(['/start'], { replaceUrl: false });
  }
}
