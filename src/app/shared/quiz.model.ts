import { AbstractControl, FormControl } from '@angular/forms';

export interface TriviaCategory {
  readonly trivia_categories: Category[];
}
export interface Category {
  readonly id: number;
  readonly name: string;
}
export type Levels = 'easy' | 'medium' | 'hard';

export interface Result {
  response_code: number;
  results: Question[];
}

export interface Question {
  category: string;
  type: string;
  difficulty: Levels;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

/* export interface QuizResult extends AbstractControl {
  question: FormControl<Question | null>;
  selectedAnswer: FormControl<string | null>;
} */


export interface QuizResult {
  question: Question,
  selectedAnswer: string,
  answers: string[],
}