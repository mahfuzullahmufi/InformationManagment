import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbSidebarService, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent {

  constructor(private sidebarService: NbSidebarService, private router: Router, private toastrService: NbToastrService) {}

  toggleSidebar = (): void => {
    this.sidebarService.toggle(true, 'menu-sidebar');
  }

  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];

  menuItems = [
    {
      title: 'Dashboard',
      link: '/',
      icon: 'home-outline',
    },
    {
      title: 'Person Information',
      icon: 'person-outline',
      expanded: false,
      children: [
        {
          title: 'Collect Information',
          link: '/information/collect-information',
          icon: 'edit-outline',
        },
        {
          title: 'View Information',
          link: '/information/view-information',
          icon: 'eye-outline',
        },
      ],
    },
  ];

  logout() {
    this.toastrService.success('You have been logged out successfully.', 'Logged Out');

    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
  
    this.router.navigate(['/auth/login']);
  }

}
