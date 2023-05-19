import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  loginForm: FormGroup;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    } else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.isLoading = true;

      if (this.isLoginMode) {
        // ...
      } else {
        this.authService.signup(email, password).subscribe({
          next: (resData) => {
            console.log(resData);
            this.isLoading = false;
          },
          error: (errorResponse) => {
            console.log(errorResponse);
            switch (errorResponse.error.error.message) {
              case 'EMAIL_EXISTS':
                this.error = 'This email already exists!';
                break;
              case 'EMAIL_NOT_FOUND':
                this.error = 'This email does not exist!';
                break;
              case 'INVALID_PASSWORD':
                this.error = 'This password is not correct!';
                break;
              default:
                this.error = 'An error occurred!';
                break;
            }
            this.isLoading = false;
          },
        });
      }
      this.loginForm.reset();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
