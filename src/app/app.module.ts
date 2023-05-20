import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/index';
import { appRoutes } from './routes';
import { DifficultyPipe, QuizService, ToggleDirective } from './shared/index';
import { ResultsComponent } from './results/index';

@NgModule({
  declarations: [AppComponent, QuizComponent, ResultsComponent, DifficultyPipe, ToggleDirective ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[RouterModule],
  providers: [QuizService],
  bootstrap: [AppComponent],
})
export class AppModule {}
