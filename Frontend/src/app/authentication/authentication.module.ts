import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbInputModule, NbButtonModule, NbLayoutModule, NbIconModule } from '@nebular/theme';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordByTokenComponent } from './reset-password-by-token/reset-password-by-token.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordByTokenComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbLayoutModule,
    NbIconModule
  ]
})
export class AuthenticationModule { }
