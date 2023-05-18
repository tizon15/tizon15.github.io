import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { shuffle } from 'lodash';
import { Observable, catchError, of } from 'rxjs';
import {
  DifficultyPipe,
  Levels,
  Question,
  QuizResult,
  Result,
  TriviaCategory,
} from './index';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient, private fb: FormBuilder) {}
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
