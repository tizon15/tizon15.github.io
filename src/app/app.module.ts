import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ResultsComponent } from './results/results.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DifficultyPipe, HighlightDirective, QuizService } from './shared/index';
import { QuizComponent } from './quiz/index';

@NgModule({
  declarations: [AppComponent, QuizComponent, ResultsComponent, DifficultyPipe, HighlightDirective],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [QuizService],
  bootstrap: [AppComponent, QuizComponent, ResultsComponent],
})
export class AppModule {}
