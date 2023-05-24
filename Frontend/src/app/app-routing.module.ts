import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { EditCountryComponent } from './edit-country/edit-country.component';
import { GetInfoComponent } from './get-info/get-info.component';
import { PdfPracticeComponent } from './create-pdf/pdf-practice/pdf-practice.component';

const routes: Routes = [
  { path : 'editCountry/:id', 
  component : EditCountryComponent 
  },
  {path:'practice-report-generate',component:PdfPracticeComponent},
  {
    path : 'country',
    component : CountryComponent
  },
  {
    path: "report",
    loadChildren: () => import("./create-pdf/create-pdf.module").then((m)=>m.CreatePdfModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
