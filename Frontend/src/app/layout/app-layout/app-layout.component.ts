import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NbSidebarService, NbToastrService } from "@nebular/theme";
import { MenuData } from "src/app/models/menu-data.model";
import { MenuService } from "src/app/services/menu.service";

@Component({
  selector: "app-app-layout",
  templateUrl: "./app-layout.component.html",
  styleUrl: "./app-layout.component.css",
})
export class AppLayoutComponent implements OnInit {
  menuItems: any[] = [];
  userName: string = localStorage.getItem("userName");
  userRole: string = localStorage.getItem("userRole");

  constructor(
    private sidebarService: NbSidebarService,
    private router: Router,
    private toastrService: NbToastrService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.menuItems = [];
    this.menuService.menuList$.subscribe(menuList => {
      if (menuList.length > 0) {
        this.generateMenuItems(menuList);
      } else {
        this.loadMenuList();
      }
    });
  }

  loadMenuList() {
    this.menuService.getMenuList().subscribe(
      (data: MenuData[]) => {
        this.generateMenuItems(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  toggleSidebar(): void {
    this.sidebarService.toggle(true, 'menu-sidebar');
  }

  generateMenuItems(menuList: MenuData[]): void {
    const parentMenus = menuList.filter(menu => menu.isParent);
    const childMenus = menuList.filter(menu => menu.parentId > 0);

    this.menuItems = parentMenus.map(parent => {
      const children = childMenus
        .filter(child => child.parentId === parent.id)
        .map(child => ({
          title: child.menuName,
          link: child.url,
          icon: child.icon,
        }));

      return {
        title: parent.menuName,
        link: parent.url,
        icon: parent.icon,
        expanded: false,
        children: children.length ? children : undefined,
      };
    });
  }

  logout() {
    this.toastrService.success('You have been logged out successfully.', 'Logged Out');
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    this.router.navigate(['/auth/login']);
  }
}
