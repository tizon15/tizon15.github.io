import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { DifficultyPipe, Categories, Levels } from './index';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  getCategory(): Observable<Categories> {
    return this.http
      .get<Categories>('https://opentdb.com/api_category.php')
      .pipe(catchError(this.handleError<Categories>('getCategory')));
  }
  getDifficulty(difficulty: number): Levels {
    let level = new DifficultyPipe().transform(difficulty);
    console.log(level);

    return level;
  }

  getUrl(category: number, difficulty: string) {
    difficulty = difficulty.toLowerCase();
    let url = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`;
    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleError<any>('getQuestions')));
  }
  private handleError<T>(_operation = 'operation', result?: T) {
    return (error: string): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
