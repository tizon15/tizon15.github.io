import { AfterViewInit, Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/index';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements AfterViewInit{
  constructor(private quizService: QuizService){}
  ngAfterViewInit(): void { 
    this.quizService.resultAnswers.subscribe(data=>{
      console.log(data);
      
    })
  }

}
