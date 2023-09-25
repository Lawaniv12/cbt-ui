import { UserService } from './../service/user.service';

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderConfig, NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../service/snackbar.service';
import { GlobalConstants } from 'src/shared/global-constants';

// Initialization for ES Users

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  responseMessage: any;
  showSuccessAlert = false;
  loginError = false;
  
  showPassword = false;



  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null, Validators.required]
    })
  }

  handleSubmit() {
    this.ngxService.start();
    const formData = this.loginForm.value;
    const data = {
      email: formData.email,
      password: formData.password
    }

    this.userService.login(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        localStorage.setItem('token', response.token);
        this.router.navigate(['/test']);
      },
      error: (error) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }

        this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });

   
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  get f() {
    return this.loginForm.controls;
  }



  // Login(form: any){
  //   let data = {
  //     userName:form.value.userName,
  //     password:form.value.password
  //   }

  //   console.log('data',data);

  //   this.loginService.login(data).subscribe((response) => {
  //     this.loginResponse = response;

  //     console.log('this.loginResponse',this.loginResponse);

  //     if(this.loginResponse.success==true){
  //       this.showSuccessAlert = true;
  //       this.router.navigate(['/test']);
  //     }
  //     else{
  //       this.loginError = true;
  //     }

  //   })
  // }

  // closeSuccessAlert(){
  //   this.showSuccessAlert = false;
  // }

  // closeErrorAlert(){
  //   this.loginError = false;
  // }
}
