import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuData } from '../models/menu-data.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = `${environment.apiUrl}Menu`;
  private menuItemsSource = new BehaviorSubject<MenuData[]>([]);
  menuList$ = this.menuItemsSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getMenuList(): Observable<MenuData[]> {
    return this.http.get<MenuData[]>(`${this.apiUrl}/get-menu-list`).pipe(
      tap((menuList: MenuData[]) => {
        this.menuItemsSource.next(menuList);
      }),
      catchError((error: HttpErrorResponse) => {
        debugger;
        if (error.status === 500 || error.status == undefined) {
          // Redirect to the error page on 500 internal server error
          this.router.navigate(['/auth/error']);
        }
        // Handle other types of errors or rethrow the error if necessary
        return throwError(() => new Error('An error occurred while fetching menu list.'));
      })
    );
  }

  updateMenuList(menuList: MenuData[]) {
    this.menuItemsSource.next(menuList);
  }

  async isUrlInMenuList(url: string): Promise<boolean> {
    const menuList = this.menuItemsSource.getValue();
    if (menuList.length === 0) {
      const fetchedMenuList = await this.getMenuList().toPromise();
      this.updateMenuList(fetchedMenuList);
      return fetchedMenuList.some(menuItem => menuItem.url === url);
    }
    return menuList.some(menuItem => menuItem.url === url);
  }

  saveMenu(menu: MenuData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-or-update-menu`, menu);
  }

  deleteMenu(menuId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-menu?Id=${menuId}`);
  }
}
