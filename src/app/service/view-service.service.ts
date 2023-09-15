import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

let AppConstant: any = "https://cbtapi.sun.edu.ng:449/api/v1/";

@Injectable({
  providedIn: 'root'
})
export class ViewServiceService {

  constructor(private http: HttpClient) { }

  submitRegistration(data: any) {
    return this.http.post(`${AppConstant}register/user`,data);
  }

  AddQuestion(data:any) {
    return this.http.post(`${AppConstant}question`,data);
  }

  ForgotPassword(data: any){
    return this.http.post(`${AppConstant}register/forgot-password`, data)
  }

  GetQuestion(questionBankId: any) {
    return this.http.get(`${AppConstant}question/${questionBankId}/questionBankId`);
  }

  GetQuestions() {
    return this.http.get(`${AppConstant}question`);
  }

  GetTestQuestions() {
    return this.http.get(`${AppConstant}question/test`);
  }

  GetTestCategory() {
    return this.http.get(`${AppConstant}category`);
  }

  GetTestResult(data: any) {
    return this.http.post(`${AppConstant}result`,data);
  }

  GetPreviousResult(testResultId: any) {
    return this.http.get(`${AppConstant}result/${testResultId}/testResultId`);
  }
}
