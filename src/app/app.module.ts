
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TestQuestionsComponent } from './test-questions/test-questions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';
import { ChangeBgDirective } from './change-bg.directive';
import { WelcomeComponent } from './welcome/welcome.component';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: "loading",
  textColor: "#fffff",
  textPosition: "center-center",
  pbColor: "red",
  bgsColor: "red",
  fgsColor: "red",
  fgsType: SPINNER.ballSpinClockwise,
  fgsSize: 100,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,

}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TestQuestionsComponent,
    LandingPageComponent,
    ChangeBgDirective,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
