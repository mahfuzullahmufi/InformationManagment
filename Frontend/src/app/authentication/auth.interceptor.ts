import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastrService: NbToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.toastrService.danger('Unauthorized access, please login.', 'Error');
          this.router.navigate(['/auth/login']);
        } else if (error.status === 500) {
          this.toastrService.danger('Internal Server Error. Please try again later.', 'Error');
          this.router.navigate(['/auth/error']); // Redirect to an error page
        }
        return throwError(error);
      })
    );
  }
}
