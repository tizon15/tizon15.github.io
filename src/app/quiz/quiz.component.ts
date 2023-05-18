import {
  Component,
  Directive,
  OnDestroy,
  OnInit,
  ViewChildren,
} from '@angular/core';
import { shuffle } from 'lodash';
import { Subscription } from 'rxjs';
import {
  Category,
  HighlightDirective,
  Levels,
  Question,
  QuizResult,
  QuizService,
  Result,
  TriviaCategory,
} from '../shared/index';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit, OnDestroy {
  private getCategorySub: Subscription | null | undefined;
  private getQuestionsSub: Subscription | null | undefined;
  protected answers: Array<string>[] = [];
  protected hasSelection = false;
  protected difficulty: string = '';
  protected showQuestions: boolean = false;
  protected questions: Question[] | undefined;
  protected category = '';
  resultAnswers: QuizResult[] = [];
  // answerItems: FormArray | undefined;
  protected categories: Category[] | undefined;
  @ViewChildren(HighlightDirective) dirs: Directive | undefined;
  constructor(private quizService: QuizService, private fb: FormBuilder) {}
  // formGroup!: FormArray;
  ngOnInit(): void {
    this.getCategorySub = this.quizService
      .getCategory()
      .subscribe((data: TriviaCategory) => {
        this.categories = data.trivia_categories;
      });
  }
 /*  addFormGroup(question: Question, answers: string[]) {
    if (this.formGroup) {
      const group = new FormGroup({
        question: new FormControl(question),
        answers: new FormControl(answers),
        selectedItem: new FormControl(''),
      });
      this.formGroup.push(group);
    } else {
      this.formGroup = new FormArray([
        new FormGroup({
          question: new FormControl(question),
          answers: new FormControl(answers),
          selectedItem: new FormControl(''),
        }),
      ]);
    }
  } */

  isDisable(): boolean {
    return +this.difficulty === 0 || this.category === '' ? true : false;
  }
  createQuestions(): void {
    this.answers = [];
    this.showQuestions = true;
    this.hasSelection = false;
    let difficulty: Levels;
    difficulty = this.quizService.getDifficulty(+this.difficulty);
    this.getQuestionsSub = this.quizService
      .getQuestions(+this.category, difficulty)
      .subscribe((data: Result) => {
        if (data) {
          this.questions = data.results;
          this.getAnswers(this.questions);
          // console.log(this.formGroup);

          this.hasSelection = true;
        } else {
          this.questions = [];
        }
      });
  }
  getAnswers(questions: Question[]) {
    questions.forEach((question: Question) => {
      this.answers.push(
        shuffle(question.incorrect_answers.concat(question.correct_answer))
      );
      /* this.addFormGroup(
        question,
        shuffle(question.incorrect_answers.concat(question.correct_answer))
      ); */
    });
  }
  /* clickAnswers(answer: string, index: number, question: Question) {
    // let value: QuizResult = {
    //   question: question,
    //   id: index,
    //   selectedAnswer: answer,
    // };
  } */
  ngOnDestroy(): void {
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
