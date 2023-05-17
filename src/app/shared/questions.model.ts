export interface Categories {
    readonly trivia_categories: Category[]
  }
  export interface Category {
    readonly id: number;
    readonly name: string;
  }
  export type Levels = 'Easy' | 'Medium' | 'Hard';
