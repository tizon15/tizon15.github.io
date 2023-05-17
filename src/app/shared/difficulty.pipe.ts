import { Pipe, PipeTransform } from '@angular/core';
import { Levels } from './questions.model';

@Pipe({ name: 'difficulty' })
export class DifficultyPipe implements PipeTransform {
  transform(value: number): Levels {
    switch (value) {
      default:
        return 'easy';
      case 2:
        return 'medium';
      case 3:
        return 'hard';
    }
  }
}
