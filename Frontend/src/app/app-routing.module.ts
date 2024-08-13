import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './excercise/country/country.component';
import { EditCountryComponent } from './excercise/edit-country/edit-country.component';
import { GetInfoComponent } from './excercise/get-info/get-info.component';
import { ExamplePdfViewerComponent } from './excercise/example-pdf-viewer/example-pdf-viewer.component';
import { StartupPageComponent } from './dashboard/startup-page/startup-page.component';
import { AuthGuard } from './authentication/auth.guard';  
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';

const routes: Routes = [
  { path: '', component: AppLayoutComponent, canActivate: [AuthGuard], children: [
      { path: '', component: StartupPageComponent },
      { path: 'get-info', component: GetInfoComponent },
      { path: 'editCountry/:id', component: EditCountryComponent },
      { path: 'country', component: CountryComponent },
      { path: 'example-pdf-viewer', component: ExamplePdfViewerComponent },
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
