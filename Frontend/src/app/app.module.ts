import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetInfoComponent } from './excercise/get-info/get-info.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CountryComponent } from './excercise/country/country.component';
import { EditCountryComponent } from './excercise/edit-country/edit-country.component';
import { NbThemeModule, NbLayoutModule, NbDatepickerModule, NbToastrModule, NbMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DataTablesModule } from 'angular-datatables';
import { TopNavbarComponent } from './dashboard/top-navbar/top-navbar.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ExamplePdfViewerComponent } from './excercise/example-pdf-viewer/example-pdf-viewer.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    GetInfoComponent,
    CountryComponent,
    EditCountryComponent,
    ExamplePdfViewerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbDatepickerModule.forRoot(),
    NbToastrModule.forRoot(),
    DataTablesModule,
    DashboardModule,
    NbMenuModule.forRoot(),
    NgxExtendedPdfViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
