import { Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { QuizComponent } from './quiz/index';

export const appRoutes: Routes = [
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: 'resultQuiz',
    component: ResultsComponent,
  },
  { path: '', redirectTo: 'quiz', pathMatch: 'full' },

  { path: '**', redirectTo: 'quiz', pathMatch: 'full' },
];
