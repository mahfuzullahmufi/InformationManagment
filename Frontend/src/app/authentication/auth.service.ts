import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserSignUp } from '../models/UserSignUp.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}Auth/`;
  private readonly tokenKey = 'token';
  private readonly userNameKey = 'userName';
  private readonly userRoleKey = 'userRole';

  constructor(
    private readonly http: HttpClient,
    private readonly toastrService: NbToastrService,
    private readonly router: Router
  ) {}

  signUp(data: UserSignUp): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}admin-sign-up`, data);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}sign-in`, { email, password }).pipe(
      tap(response => this.handleLoginResponse(response))
    );
  }

  logout(): void {
    this.clearAuthData();
    this.toastrService.success('You have been logged out successfully.', 'Logged Out');
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  private handleLoginResponse(response: any): void {
    if (response.isSuccess) {
      this.saveAuthData(response.token, `${response.userData.firstName}`, response.userData.userRole);
      this.toastrService.success('Success, You are successfully logged in', 'Login Success');
    } else {
      this.toastrService.danger(response.message, 'Login failed');
    }
  }

  private saveAuthData(token: string, userName: string, userRole: number): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userNameKey, userName);
    localStorage.setItem(this.userRoleKey, userRole.toString());
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userNameKey);
    localStorage.removeItem(this.userRoleKey);
  }
}
