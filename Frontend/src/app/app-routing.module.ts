import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { EditCountryComponent } from './edit-country/edit-country.component';
import { GetInfoComponent } from './get-info/get-info.component';

const routes: Routes = [
  { path : 'get-info', component : GetInfoComponent },
  {
    path: "information",
    loadChildren: () => import("./home/information/information.module").then((m) => m.InformationModule),
  },
  { path : 'editCountry/:id', component : EditCountryComponent },
  { path : 'country', component : CountryComponent },
  // {
  //   path: "report",
  //   loadChildren: () => import("./create-pdf/create-pdf.module").then((m)=>m.CreatePdfModule)
  // },
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
