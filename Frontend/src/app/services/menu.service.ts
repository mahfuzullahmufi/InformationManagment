import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuData } from '../models/menu-data.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = `${environment.apiUrl}Menu`;
  private menuItemsSource = new BehaviorSubject<MenuData[]>([]);
  menuList$ = this.menuItemsSource.asObservable();

  constructor(private http: HttpClient) {}

  getMenuList(): Observable<MenuData[]> {
    return this.http.get<MenuData[]>(`${this.apiUrl}/get-menu-list`).pipe(
      tap((menuList: MenuData[]) => {
        this.menuItemsSource.next(menuList);
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
