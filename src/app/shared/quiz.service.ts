import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import {
  DifficultyPipe,
  Levels,
  Question,
  Result,
  TriviaCategory,
} from './index';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  resultAnswers = new BehaviorSubject<FormGroup>(new FormGroup({}));
  constructor(private http: HttpClient) {}

  /**
   * Method to get the categories from the url of the API and return the data
   *
   * @return {*}  {Observable<TriviaCategory>}
   * @memberof QuizService
   */
  getCategory(): Observable<TriviaCategory> {
    return this.http
      .get<TriviaCategory>('https://opentdb.com/api_category.php')
      .pipe(catchError(this.handleError<TriviaCategory>('getCategory')));
  }

  /**
   * Method to transform the difficulty get it from the dropdown and transform the value
   * with the Difficult Pipe
   * @param {number} difficulty
   * @return {*}  {Levels}
   * @memberof QuizService
   */
  getDifficulty(difficulty: number): Levels {
    let level = new DifficultyPipe().transform(difficulty);
    return level;
  }
  /**
   * Method to get the questions passing the values into the url and return the data
   *
   * @param {number} category
   * @param {string} difficulty
   * @return {*}  {Observable<Result>}
   * @memberof QuizService
   */
  getQuestions(category: number, difficulty: string): Observable<Result> {
    let url = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`;
    return this.http
      .get<Result>(url)
      .pipe(catchError(this.handleError<Result>('getQuestions')));
  }

  /**
   * Creation of the form for the answers
   *
   * @return {*}  {FormGroup}
   * @memberof QuizService
   */
  newForm(): FormGroup {
    return new FormGroup({
      question: new FormArray([]),
      answers: new FormArray([]),
      selectedAnswer: new FormArray([]),
    });
  }

  /**
   * Added the information to the formGroup
   *
   * @param {FormGroup} formGroup
   * @param {Question} question
   * @param {string[]} answers
   * @return {*}  {FormGroup}
   * @memberof QuizService
   */
  addForm(formGroup: FormGroup,question: Question,answers: string[]): FormGroup {
    const questionArray = formGroup.controls['question'] as FormArray;
    const answersArray = formGroup.controls['answers'] as FormArray;
    const selectedArray = formGroup.controls['selectedAnswer'] as FormArray;
    questionArray.push(new FormControl(question.question));
    answersArray.push(new FormControl(answers));
    selectedArray.push(
      new FormGroup({
        item: new FormControl('', [Validators.required]),
        correctAnswer: new FormControl(question.correct_answer),
      })
    );
    return formGroup;
  }

  /**
   * Method to catch the error if the request to the API fails
   *
   * @private
   * @template T
   * @param {string} [_operation='operation']
   * @param {T} [result]
   * @return {*} 
   * @memberof QuizService
   */
  private handleError<T>(_operation: string = 'operation', result?: T){
    return (error: string): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
