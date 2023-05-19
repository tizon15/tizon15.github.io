import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/index';
import { ResultsComponent } from './results/results.component';
import { appRoutes } from './routes';
import { DifficultyPipe, HighlightDirective, QuizService } from './shared/index';

@NgModule({
  declarations: [AppComponent, QuizComponent, ResultsComponent, DifficultyPipe, HighlightDirective],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[RouterModule],
  providers: [QuizService],
  bootstrap: [AppComponent],
})
export class AppModule {}
