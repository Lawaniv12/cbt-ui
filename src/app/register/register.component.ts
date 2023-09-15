import { UserService } from './../service/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../service/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/shared/global-constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  signupForm: any = FormGroup;
  responseMessage: any;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbar: SnackbarService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void{
    this.signupForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber: [null, [Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password: [null, [Validators.required]]


    })
  }

  get f() {
    return this.signupForm.controls;
  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.signupForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password
    }

    this.userService.signup(data).subscribe({
      next: (response: any) => {
        console.log(response);
        this.ngxService.stop();
        this.responseMessage = response?.message;
        this.snackbar.openSnackBar(this.responseMessage, "");
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });
  }


}
