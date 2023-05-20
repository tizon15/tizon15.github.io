import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  Category,
  Question,
  QuizService,
  TriviaCategory
} from '../shared/index';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit, OnDestroy {
  private getCategorySub!: Subscription | null;
  protected difficulty: string = '';
  protected showQuestions: boolean = false;
  protected questions!: Question[];
  protected category = '';
  protected categories!: Category[];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    /**
     * Suscription to the service to get the categories
     */
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
    this.showQuestions = false;
    setTimeout(() => {
      this.showQuestions = true;
    }, 100);
  }

  /**
   * Method to disable the button if the category and difficulty are not selected
   *
   * @protected
   * @return {*}  {boolean}
   * @memberof QuizComponent
   */
  protected isDisable(category: number, difficulty: number): boolean {
    return +difficulty === 0 || category === 0 ? true : false;
  }

  ngOnDestroy(): void {
    this.showQuestions = false;
    if (this.getCategorySub) {
      this.getCategorySub.unsubscribe();
      this.getCategorySub = null;
    }
  }
}
