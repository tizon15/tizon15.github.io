import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ResultsComponent } from './results/results.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DifficultyPipe, QuestionsService } from './shared/index';
import { QuizComponent } from './quiz/quiz.component';

@NgModule({
  declarations: [AppComponent, QuizComponent, ResultsComponent, DifficultyPipe],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [QuestionsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
