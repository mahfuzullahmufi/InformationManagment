import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { MenuService } from '../services/menu.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private menuService: MenuService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    const currentUrl = state.url;

    if (!isAuthenticated) {
      this.authService.setRedirectUrl(currentUrl);
      this.router.navigate(['/auth/login']);
      return false;
    }

    return this.menuService.isUrlInMenuList(currentUrl).then(isUrlAllowed => {
      if (isUrlAllowed) {
        return true;
      } else {
        this.router.navigate(['/configuration/not-found']);
        return false;
      }
    }).catch(() => {
      this.router.navigate(['/configuration/not-found']);
      return false;
    });
  }
}
