import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';  
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { StartupPageComponent } from './dashboard/startup-page/startup-page.component';

const routes: Routes = [
  { path: '', component: AppLayoutComponent, canActivate: [AuthGuard], children: [
      { path: '', component: StartupPageComponent },
      { path: 'configuration', loadChildren: () => import('./home/configuration/configuration.module').then(m => m.ConfigurationModule) },
      { path: 'information', loadChildren: () => import('./home/information/information.module').then(m => m.InformationModule) },
      { path: 'pdf', loadChildren: () => import('./home/generate-pdf/generate-pdf.module').then(m => m.GeneratePdfModule) }
    ]
  },
  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
