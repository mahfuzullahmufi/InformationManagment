import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';  
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { StartupPageComponent } from './dashboard/startup-page/startup-page.component';
import { NotFoundComponent } from './home/configuration/not-found/not-found.component';
import { ErrorPageComponent } from './authentication/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: StartupPageComponent },
      { path: 'configuration', loadChildren: () => import('./home/configuration/configuration.module').then(m => m.ConfigurationModule) },
      { path: 'information', loadChildren: () => import('./home/information/information.module').then(m => m.InformationModule) },
      { path: 'pdf', loadChildren: () => import('./home/generate-pdf/generate-pdf.module').then(m => m.GeneratePdfModule) }
    ]
  },
  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'configuration/not-found', component: NotFoundComponent },
  { path: 'auth/error', component: ErrorPageComponent },
  { path: '**', redirectTo: 'configuration/not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
