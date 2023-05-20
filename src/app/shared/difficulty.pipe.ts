import { Pipe, PipeTransform } from '@angular/core';
import { Levels } from './index';

@Pipe({ name: 'difficulty' })
export class DifficultyPipe implements PipeTransform {

  /**
   * Method to transform the value number in one of the Levels type
   * to later make the query with that
   *
   * @param {number} value
   * @return {*}  {Levels}
   * @memberof DifficultyPipe
   */
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
