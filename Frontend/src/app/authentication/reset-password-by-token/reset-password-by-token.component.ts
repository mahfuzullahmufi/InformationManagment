import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ApiResponse } from 'src/app/models/api-response.model';
import { ResetPasswordByToken } from 'src/app/models/reset-password-by-token.model';

@Component({
  selector: 'app-reset-password-by-token',
  templateUrl: './reset-password-by-token.component.html',
  styleUrls: ['./reset-password-by-token.component.css']
})
export class ResetPasswordByTokenComponent implements OnInit {

  form: FormGroup;
  showPassword = false;
  passwordFieldType = 'password';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.populateFormFromQueryParams();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      token: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  populateFormFromQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const token = params['token'];
      if (email) {
        this.form.get('email').setValue(email);
      }
      if (token) {
        this.form.get('token').setValue(token);
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this.passwordFieldType = this.showPassword ? 'text' : 'password';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.toastrService.danger('Please fill all required fields', 'Error');
      return;
    }

    const formData: ResetPasswordByToken = this.form.value;

    this.authService.resetPasswordByToken(formData).subscribe(
      (response: ApiResponse) => {
        if (response.isSuccess) {
          this.toastrService.success('Password reset successfully', 'Success');
          this.router.navigate(['/auth/login']);
        } else {
          this.toastrService.danger(response.message, 'Error');
        }
      },
      error => {
        this.toastrService.danger('Error resetting password', 'Error');
        console.error('Error resetting password', error);
      }
    );
  }
}
