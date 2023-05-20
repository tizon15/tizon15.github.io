import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
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

  /**
   * Method to convert the AbstractControl into a Form Array
   *
   * @readonly
   * @memberof QuizComponent
   */
  get answersForm(): FormArray {
    return this.formGroup.get('answers') as FormArray;
  }
  get selectionForm(): FormArray {
    return this.formGroup.get('selectedAnswer') as FormArray;
  }

  get questionForm(): FormArray {
    return this.formGroup.get('question') as FormArray;
  }
  getSelectedItemFormGroup(item: AbstractControl): FormGroup {
    return item as FormGroup;
  }

  ngOnInit(): void {
    this.getCategorySub = this.quizService
      .getCategory()
      .subscribe((data: TriviaCategory) => {
        if (data) {
          this.categories = data.trivia_categories;
        }
      });
  }

  /**
   * Method to reset the parameters if the user clicks in the Create Button
   * and subscribe to the observable to get the data from the server passing the values of the category and difficulty
   *
   * @protected
   * @memberof QuizComponent
   */
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

  /**
   * Method to get the question and fill the formGroup with a shuffle of the answers
   * 
   * @private
   * @param {Question[]} questions 
   * @memberof QuizComponent
   */
  private getAnswers(questions: Question[]): void {
    questions.forEach((question: Question) => {
      this.addFormGroup(
        question,
        shuffle(question.incorrect_answers.concat(question.correct_answer))
      );
    });
  }

  /**
   * Method that calls to the service to fill the formGroup with the data
   *
   * @private
   * @param {Question} question
   * @param {string[]} answers
   * @memberof QuizComponent
   */
  private addFormGroup(question: Question, answers: string[]): void {
    this.formGroup = this.quizService.addForm(
      this.formGroup,
      question,
      answers
    );
  }

  /**
   * Method to disable the button if the category and difficulty are not selected 
   *
   * @protected
   * @return {*}  {boolean}
   * @memberof QuizComponent
   */
  protected isDisable(): boolean {
    return +this.difficulty === 0 || this.category === '' ? true : false;
  }

  /**
   * Patching the value of the item with the value of the button
   *
   * @protected
   * @param {string} value
   * @param {AbstractControl} selectedForm
   * @memberof QuizComponent
   */
  protected onClickAnswer(value: string, selectedForm: AbstractControl): void {
    let selectedItem = selectedForm as FormGroup;
    if (selectedItem.controls['item'].value === value) {
      selectedItem.controls['item'].patchValue(undefined);
    } else {
      selectedItem.controls['item'].patchValue(value);
    }
  }

  /**
   * Method to display the submit button if the form is valid
   *
   * @protected
   * @return {*}  {boolean}
   * @memberof QuizComponent
   */
  protected checkResult(): boolean {
    return this.formGroup.valid;
  }

  /**
   * method to send the form to the service by a behavior subject
   *
   * @protected
   * @memberof QuizComponent
   */
  protected clickAnswers(): void {
    this.quizService.resultAnswers.next(this.formGroup);
  }

  /**
   * method to reset the parameters if the user clicks again in the create o the component it's destroyed
   *
   * @private
   * @memberof QuizComponent
   */
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
