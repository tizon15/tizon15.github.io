import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import {
  QuestionsService,
  Category,
  TriviaCategory,
  Levels,
  Result,
  Question,
} from '../shared/index';
import { shuffle } from 'lodash';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit, OnDestroy {
  private getCategorySub: Subscription | null | undefined;
  categories: Category[] | undefined;
  questions: Question[] | undefined;
  number = Math.floor(Math.random() * 3) + 1;
  private difficulty: Levels | undefined;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private questionsService: QuestionsService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.getCategorySub = this.questionsService
      .getCategory()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: TriviaCategory) => {
        this.categories = data.trivia_categories;
      });
  }
  createQuestions(category: string, difficulty: string) {
    this.difficulty = this.questionsService.getDifficulty(+difficulty);
    console.log(+category);
    console.log(this.difficulty);
    this.questionsService
      .getQuestions(+category, this.difficulty)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Result) => {
        console.log('questions', data);
        this.questions = data.results;
      });
  }
  getAnswers(question: any): string[] {
    // this.cdr.detectChanges();
    let answers = question.incorrect_answers.concat(question.correct_answer);
    answers = answers
      .map((x: string) => ({ ord: Math.random(), data: x }))
      .sort((a: { ord: number }, b: { ord: number }) =>
        a.ord > b.ord ? 1 : a.ord < b.ord ? -1 : 0
      )
      .map((x: { data: string }) => x.data);
    return answers;
  }
  answerTrackBy(index: any, answers: any) {
    return answers.name;
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
    if (this.getCategorySub) {
      this.getCategorySub.unsubscribe();
      this.getCategorySub = null;
    }
  }
}
