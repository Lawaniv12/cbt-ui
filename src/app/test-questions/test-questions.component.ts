import { Component } from '@angular/core';
import { QuestionServiceService } from '../service/question-service.service';
import { interval } from 'rxjs';
import { PersonalityAssessmentService } from '../service/personality-assessment.service';

@Component({
  selector: 'app-test-questions',
  templateUrl: './test-questions.component.html',
  styleUrls: ['./test-questions.component.scss']
})
export class TestQuestionsComponent {
  public name : string = "";
  public questionList : any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$:any;
  progress:string = "0";
  isQuizCompleted: boolean = false;
  progressBar: number = 0;

  constructor(private questionService: QuestionServiceService, private personalityService: PersonalityAssessmentService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions(){
    this.questionService.getQuestionJson().subscribe(res => {
      this.questionList = res.questions;
    })

  }

  nextQuestion(){
    this.currentQuestion++;
  }

  previousQuestion(){
    this.currentQuestion--;
  }

  answer(currentQno:number, option:any){
    console.log("Option Clicked:", option);
    if (currentQno === this.questionList.length){
      this.isQuizCompleted = true;
      this.stopCounter();
    }

    const question = this.questionList[currentQno - 1]; // Get the current question
    const testCategory = question?.otherInfo?.testCategory || question?.optionsInfo?.testCategory;

    if(option.correct){
      this.points += 10; // Increase points by 10 if the option is correct
      this.correctAnswer++;
    } else {
      this.points -= 10; // Decrease points by 10 if the option is incorrect
      this.inCorrectAnswer++;
    }

    setTimeout(() => {
      this.currentQuestion++;
      this.resetCounter();
      this.getProgressPercent();
    }, 1000);

    this.personalityService.updateScores(testCategory, option.correct);

    console.log("TestCategory:", testCategory);
    console.log("Correct:", option.correct);
}





getPersonalityScores() {
  return this.personalityService.getScores();
}





  startCounter(){
    this.interval$ = interval(1000)
    .subscribe(val =>{
      this.counter--;
      if(this.counter===0){
        this.currentQuestion++;
        this.counter=60;
        this.points -=10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe()
    }, 600000);
  }

  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }

  resetCounter(){
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter=60;
    this.currentQuestion = 0;
    this.progress = "0";
  }

  getProgressPercent(){
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }
}
