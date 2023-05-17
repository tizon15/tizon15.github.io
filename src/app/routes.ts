import { Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';

export const appRoutes: Routes = [
  {
    path: 'quiz',
    component: QuizComponent,
  },
  { path: '', redirectTo: '/quiz', pathMatch: 'full' },
];
