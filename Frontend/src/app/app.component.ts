import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private sidebarService: NbSidebarService) {}

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

  ngOnInit(): void {
    // Initialization logic here
  }
}
