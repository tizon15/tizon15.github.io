import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import {
  DifficultyPipe,
  TriviaCategory,
  Levels,
  Result,
  Question,
} from './index';
import { shuffle } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  getCategory(): Observable<TriviaCategory> {
    return this.http
      .get<TriviaCategory>('https://opentdb.com/api_category.php')
      .pipe(catchError(this.handleError<TriviaCategory>('getCategory')));
  }
  getDifficulty(difficulty: number): Levels {
    let level = new DifficultyPipe().transform(difficulty);
    return level;
  }

  getQuestions(category: number, difficulty: string): Observable<Result> {
    let url = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`;
    return this.http
      .get<Result>(url)
      .pipe(catchError(this.handleError<Result>('getQuestions')));
  }

  getAnswers(question: Question): string[] {
    if (question) {
      let answers = question.incorrect_answers.concat(question.correct_answer);
      answers = shuffle(answers);
      return answers;
    } else {
      return [];
    }
  }

  // formBuilder
  private handleError<T>(_operation = 'operation', result?: T) {
    return (error: string): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
