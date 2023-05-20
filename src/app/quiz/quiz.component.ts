import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { shuffle } from 'lodash';
import { Subscription } from 'rxjs';
import {
  Category,
  Question,
  QuizService,
  Result,
  TriviaCategory,
} from '../shared/index';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit, OnDestroy {
  private getCategorySub!: Subscription | null;
  private getQuestionsSub!: Subscription | null;
  protected hasSelection = false;
  protected difficulty: string = '';
  protected showQuestions: boolean = false;
  protected questions!: Question[];
  protected category = '';
  protected formGroup: FormGroup = this.quizService.newForm();
  protected categories!: Category[];

  constructor(private quizService: QuizService) {}

  get answersForm() {
    return this.formGroup.get('answers') as FormArray;
  }
  get selectionForm() {
    return this.formGroup.get('selectedAnswer') as FormArray;
  }

  get questionForm() {
    return this.formGroup.get('question') as FormArray;
  }
  getSelectedItemFormGroup(item: AbstractControl) {
    return item as FormGroup;
  }

  ngOnInit(): void {
    this.getCategorySub = this.quizService
      .getCategory()
      .subscribe((data: TriviaCategory) => {
        this.categories = data.trivia_categories;
      });
  }

  protected createQuestions(): void {
    this.reset();
    let difficulty = this.quizService.getDifficulty(+this.difficulty);
    this.getQuestionsSub = this.quizService
      .getQuestions(+this.category, difficulty)
      .subscribe((data: Result) => {
        if (data) {
          this.questions = data.results;
          this.getAnswers(this.questions);
          this.hasSelection = true;
        }
      });
  }

  private getAnswers(questions: Question[]): void {
    questions.forEach((question: Question) => {
      this.addFormGroup(
        question,
        shuffle(question.incorrect_answers.concat(question.correct_answer))
      );
    });
  }

  private addFormGroup(question: Question, answers: string[]): void {
    this.formGroup = this.quizService.addForm(
      this.formGroup,
      question,
      answers
    );
  }

  protected isDisable(): boolean {
    return +this.difficulty === 0 || this.category === '' ? true : false;
  }
  protected onClickAnswer(value: string, selectedForm: AbstractControl): void {
    let selectedItem = selectedForm as FormGroup;
    if (selectedItem.controls['item'].value === value) {
      selectedItem.controls['item'].patchValue(undefined);
    } else {
      selectedItem.controls['item'].patchValue(value);
    }
  }
  protected checkResult(): boolean {
    return this.formGroup.valid;
  }

  protected clickAnswers(): void {
    this.quizService.resultAnswers.next(this.formGroup);
  }
  private reset(): void {
    this.questions = [];
    this.formGroup = this.quizService.newForm();
    this.showQuestions = true;
    this.hasSelection = false;
  }

  ngOnDestroy(): void {
    this.reset();
    if (this.getCategorySub) {
      this.getCategorySub.unsubscribe();
      this.getCategorySub = null;
    }
    if (this.getQuestionsSub) {
      this.getQuestionsSub.unsubscribe();
      this.getQuestionsSub = null;
    }
  }
}
