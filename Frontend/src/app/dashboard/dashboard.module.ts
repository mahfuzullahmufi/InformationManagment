import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { StartupPageComponent } from './startup-page/startup-page.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbMenuModule, NbSelectModule } from '@nebular/theme';
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    StartupPageComponent,
    TopNavbarComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NbMenuModule,
    NbSelectModule,
    NbIconModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,  
  ],
  exports:[
    TopNavbarComponent,
    NavBarComponent
  ]
})
export class DashboardModule { }
