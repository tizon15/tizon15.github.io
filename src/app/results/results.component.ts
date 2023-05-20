import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { QuizService } from '../shared/index';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit, OnDestroy {
  private formGroup!: FormGroup;
  private resultsSubs!: Subscription | null;
  score: number = 0;
  constructor(private quizService: QuizService) {}

  get questionForm(): FormArray {
    return this.formGroup.get('question') as FormArray;
  }

  get answersForm() {
    return this.formGroup.get('answers') as FormArray;
  }

  get selectionForm() {
    return this.formGroup.get('selectedAnswer') as FormArray;
  }
  getFormGroup(item: AbstractControl) {
    return item as FormGroup;
  }
  ngOnInit(): void {
    this.resultsSubs = this.quizService.resultAnswers.subscribe((data) => {
      this.formGroup = data;
    });
  }
  changeColorButtons(value: string, selectedAnswer: AbstractControl) {
    let item = selectedAnswer.get('item') as FormControl;
    let correct = selectedAnswer.get('correctAnswer') as FormControl;
    if (value === correct.value && value === item.value) {
      this.score += 1;
      return 'btn-success ';
    } else if (value === item.value) {
      return 'btn-success ';
    } else if (value === correct.value) {
      return 'btn-danger disabled';
    } else {
      return 'btn-outline-success';
    }
  }
  changeColorScore() {
    if (this.score <= 1) {
      return 'red';
    } else if (this.score > 1 && this.score < 5) {
      return 'yellow';
    } else {
      return 'green';
    }
  }

  ngOnDestroy(): void {
    if (this.resultsSubs) {
      this.resultsSubs.unsubscribe();
      this.resultsSubs = null;
    }
  }
}
