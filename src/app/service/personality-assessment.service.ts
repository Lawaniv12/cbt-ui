import { Injectable } from '@angular/core';

interface PersonalityScores {
  [key: string]: number;
}

@Injectable({
  providedIn: 'root'
})
export class PersonalityAssessmentService {
  private personalityScores: Record<string, number> = {
    "Sensitive": 0,
    "Extrovert": 0,
    "Judging": 0,
    "Thinking": 0,
  };

  updateScores(category: string, correct: boolean) {
    console.log("Category:", category, "Correct:", correct);
    if (category && correct !== undefined) {
      const scoreChange = correct ? 10 : -10;
      this.personalityScores[category] += scoreChange;
    } else {
      console.error("Invalid category or correct value");
    }
  }


  getScores() {
    return this.personalityScores;
  }

}

