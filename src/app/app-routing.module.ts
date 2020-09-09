import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { GameComponent } from './components/game/game.component';
import { SummaryComponent } from './components/summary/summary.component';


const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'start',
    component: GameComponent,
  },
  {
    path: 'summary',
    component: SummaryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
