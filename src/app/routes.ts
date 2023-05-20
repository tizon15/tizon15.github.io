import { Routes } from '@angular/router';
import { QuizComponent } from './quiz/index';
import { ResultsComponent } from './results/results.component';

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
