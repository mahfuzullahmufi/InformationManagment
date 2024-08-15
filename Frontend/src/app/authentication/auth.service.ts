import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserSignUp } from '../models/UserSignUp.model';
import { ApiResponse } from '../models/api-response.model';
import { MenuService } from '../services/menu.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}Auth/`;
  private readonly tokenKey = 'token';
  private readonly userNameKey = 'userName';
  private readonly userRoleKey = 'userRole';
  private redirectUrlSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly toastrService: NbToastrService,
    private readonly router: Router,
    private readonly menuService: MenuService
  ) {}

  setRedirectUrl(url: string) {
    this.redirectUrlSubject.next(url);
  }

  getRedirectUrl(): Observable<string | null> {
    return this.redirectUrlSubject.asObservable();
  }

  signUp(data: UserSignUp): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}admin-sign-up`, data);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}sign-in`, { email, password }).pipe(
      tap(response => {
        if (response.isSuccess) {
          this.saveAuthData(response.token, response.name, response.role);
          this.toastrService.success('Success, You are successfully logged in', 'Login Success');
          
          this.menuService.getMenuList().subscribe(menuList => {
            this.menuService.updateMenuList(menuList);
            const redirectUrl = this.redirectUrlSubject.getValue() || '/';
            if (redirectUrl && this.menuService.isUrlInMenuList(redirectUrl)) {
              this.router.navigate([redirectUrl]);
            } else {
              this.router.navigate(['/configuration/not-found']);
            }
          });
        } else {
          this.toastrService.danger(response.message, 'Login failed');
        }
      })
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

  private saveAuthData(token: string, userName: string, userRole: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userNameKey, userName);
    localStorage.setItem(this.userRoleKey, userRole);
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userNameKey);
    localStorage.removeItem(this.userRoleKey);
    this.redirectUrlSubject.next(null);
  }
}