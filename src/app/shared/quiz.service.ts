import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { shuffle } from 'lodash';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import {
  DifficultyPipe,
  Levels,
  Question,
  Result,
  TriviaCategory
} from './index';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  resultAnswers = new BehaviorSubject<FormGroup>(new FormGroup({}));
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
  newForm(){
    return new FormGroup({
      question: new FormArray([]),
      answers: new FormArray([]),
      selectedAnswer: new FormArray([]),
    })
  }
  addForm(formGroup: FormGroup, question:Question, answers: string[]){
    const questionArray = formGroup.controls['question'] as FormArray;
    const answersArray = formGroup.controls['answers'] as FormArray;
    const selectedArray = formGroup.controls[
      'selectedAnswer'
    ] as FormArray;
    questionArray.push(new FormControl(question.question));
    answersArray.push(new FormControl(answers));
    selectedArray.push(
      new FormGroup({
        item: new FormControl('', [Validators.required]),
        correctAnswer: new FormControl(question.correct_answer)
      })
    );
    return formGroup
  }
  // formBuilder
  private handleError<T>(_operation = 'operation', result?: T) {
    return (error: string): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
