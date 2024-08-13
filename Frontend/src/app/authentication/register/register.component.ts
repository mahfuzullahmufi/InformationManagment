import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { UserSignUp } from 'src/app/models/UserSignUp.model';
import { AuthService } from '../auth.service';
import { ApiResponse } from 'src/app/models/api-response.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  passwordFieldType = 'password';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastrService: NbToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.mustMatch('password', 'confirmPassword') });
  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.mustMatch) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const user: UserSignUp = this.signUpForm.value;
  
      this.authService.signUp(user).subscribe(
        (response: ApiResponse) => {
          if (response.isSuccess) {
            this.toastrService.success(response.message, 'Success');
            this.router.navigate(['/auth/login']);
          } else {
            this.toastrService.danger(response.message, 'Error');
          }
        },
        (error) => {
          this.toastrService.danger('Something went wrong. Please try again later.', 'Error');
          console.error('Sign up error:', error);
        }
      );
    } else {
      this.toastrService.danger('All fields are required', 'Error');
    }
  }
  
}