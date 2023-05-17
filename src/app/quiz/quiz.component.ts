import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import {
  Category,
  Levels,
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
  private getCategorySub: Subscription | null | undefined;
  hasSelection = false;
  showQuestions: boolean = false;
  categories: Category[] | undefined;
  questions: Question[] | undefined;
  private difficulty: Levels | undefined;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private questionsService: QuizService,
  ) {}

  ngOnInit(): void {
    this.getCategorySub = this.questionsService
      .getCategory()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: TriviaCategory) => {
        this.categories = data.trivia_categories;
      });
  }
  isDisable(categoryValue: number, difficultyValue: number) {
    let category = categoryValue || categoryValue;
    let difficulty = difficultyValue || difficultyValue;
    if (category > 0 && difficulty > 0) {
      return false;
    } else {
      return true;
    }
  }
  createQuestions(category: string, difficulty: string) {
    this.showQuestions = false;
    this.hasSelection = true;
    this.difficulty = this.questionsService.getDifficulty(+difficulty);
    this.questionsService
      .getQuestions(+category, this.difficulty)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Result) => {
        if (data) {
          this.questions = data.results;
          this.showQuestions = true;
        }
      });
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
