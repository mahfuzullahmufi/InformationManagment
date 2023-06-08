import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './excercise/country/country.component';
import { EditCountryComponent } from './excercise/edit-country/edit-country.component';
import { GetInfoComponent } from './excercise/get-info/get-info.component';
import { ExamplePdfViewerComponent } from './excercise/example-pdf-viewer/example-pdf-viewer.component';
import { StartupPageComponent } from './dashboard/startup-page/startup-page.component';

const routes: Routes = [
  { path : '', component : StartupPageComponent },
  { path : 'get-info', component : GetInfoComponent },
  {
    path: "information",
    loadChildren: () => import("./home/information/information.module").then((m) => m.InformationModule),
  },
  { path : 'editCountry/:id', component : EditCountryComponent },
  { path : 'country', component : CountryComponent },
  { path : 'example-pdf-viewer', component : ExamplePdfViewerComponent },
  {
    path: "pdf",
    loadChildren: () => import("./home/generate-pdf/generate-pdf.module").then((m)=>m.GeneratePdfModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
