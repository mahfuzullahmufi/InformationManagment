import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordByTokenComponent } from './reset-password-by-token/reset-password-by-token.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password-by-token', component: ResetPasswordByTokenComponent },
  { path: 'error', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
