import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import {
  QuestionsService,
  Category,
  Categories,
  Levels,
} from '../shared/index';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit, OnDestroy {
  getCategorySub: Subscription | null | undefined;
  categories: Category[] | undefined;
  private difficulty: Levels | undefined;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private questionsService: QuestionsService) {}
  ngOnInit(): void {
    this.getCategorySub = this.questionsService.getCategory()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Categories) => {
        console.log('data', data);

        this.categories = data.trivia_categories;
      });
  }
  createQuestions(category: string, difficulty: string){
    this.difficulty = this.questionsService.getDifficulty(+difficulty);
    console.log(+category);
    console.log(this.difficulty);
    this.questionsService.getUrl(+category, this.difficulty).pipe(takeUntil(this.destroy$)).subscribe((data)=>{
      console.log('questions', data);
      
    })
    
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
