import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { EditCountryComponent } from './edit-country/edit-country.component';
import { GetInfoComponent } from './get-info/get-info.component';

const routes: Routes = [
  { path : 'editCountry/:id', 
  component : EditCountryComponent },
  {
    path : 'country',
    component : CountryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
