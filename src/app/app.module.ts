import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { QuestionComponent } from './components/question/question.component';
import { GameComponent } from './components/game/game.component';
import { GameService } from './services/game.service';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { SummaryComponent } from './components/summary/summary.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { stateReducers } from './reducers';
import { AnswerEffects } from './effects/answer-effect.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    QuestionComponent,
    GameComponent,
    HeaderComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(stateReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25 // Retains last 25 states
    }),
    EffectsModule.forRoot([AnswerEffects])
  ],
  providers: [GameService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
