import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ApiResponse } from 'src/app/models/api-response.model';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

  form: FormGroup;
  showPassword = false;
  passwordFieldType: string = 'password';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private toastrService: NbToastrService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.value;
      this.authService.forgetPassword(email).subscribe((response : ApiResponse) => {
        if(response.isSuccess) {
          this.toastrService.success('Please check your email for password reset link', 'Success');
        } else {
          this.toastrService.danger(response.message, 'Error');
        }
      });
    } else {
      this.toastrService.danger('Please input required fields!', 'Error');
    }
  }

}
