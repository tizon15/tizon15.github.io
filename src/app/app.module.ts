import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { QuestionsComponent, QuizComponent } from './quiz/index';
import { ResultsComponent } from './results/index';
import { appRoutes } from './routes';
import { DifficultyPipe, QuizService, ToggleDirective } from './shared/index';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    QuizComponent,
    ResultsComponent,
    DifficultyPipe,
    ToggleDirective,
    QuestionsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [QuizService],
})
export class AppModule {}
