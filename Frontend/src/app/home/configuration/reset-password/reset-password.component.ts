import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/authentication/auth.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { ResetPassword } from 'src/app/models/reset-password.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  showCurrentPassword = false;
  showNewPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  toggleCurrentPasswordVisibility(): void {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const resetPasswordData: ResetPassword = this.form.value;

    this.authService.resetPassword(resetPasswordData).subscribe(
      (response: ApiResponse) => {
        if (response.isSuccess) {
          this.toastrService.success('Password reset successful');
        } else {
          this.toastrService.danger('Password reset failed');
        }
      },
      error => {
        console.error('Error resetting password', error);
      }
    );
  }
}
