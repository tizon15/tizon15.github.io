import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { shuffle } from 'lodash';
import { Subscription } from 'rxjs';
import { Question, QuizService, Result } from 'src/app/shared';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit, OnDestroy {
  protected formGroup: FormGroup = this.quizService.newForm();
  private getQuestionsSub!: Subscription | null;
  @Input() hasSelection!: boolean;
  @Input() difficulty!: string;
  @Input() category!: string;
  protected questions!: Question[];
  
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

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.reset();
    let difficulty = this.quizService.getDifficulty(+this.difficulty);
    /**
     * Suscription to the service to get the questions
     */
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
   * Method to send the form to the service by a behavior subject
   *
   * @protected
   * @memberof QuizComponent
   */
  protected clickAnswers(): void {
    this.quizService.resultAnswers.next(this.formGroup);
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
   * method to reset the parameters if the user clicks again in the create o the component it's destroyed
   *
   * @private
   * @memberof QuizComponent
   */
  private reset(): void {
    this.questions = [];
    this.formGroup = this.quizService.newForm();
    this.hasSelection = false;
  }
  
  ngOnDestroy(): void {
    this.reset();
    if (this.getQuestionsSub) {
      this.getQuestionsSub.unsubscribe();
      this.getQuestionsSub = null;
    }
  }
}
