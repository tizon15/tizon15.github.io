import { Component, Input } from '@angular/core';
import { Question, QuizService } from '../../shared/index';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent {
  @Input() questions:Question[] | undefined
  constructor(private quizService: QuizService){}
  getAnswers(question: Question): string[] {
    return this.quizService.getAnswers(question);
  }
  showQuestion() {
    return true;
  }
}
