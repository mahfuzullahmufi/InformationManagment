import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetInfoComponent } from './excercise/get-info/get-info.component';
import { CountryComponent } from './excercise/country/country.component';
import { EditCountryComponent } from './excercise/edit-country/edit-country.component';
import { ExamplePdfViewerComponent } from './excercise/example-pdf-viewer/example-pdf-viewer.component';
import { NbThemeModule, NbLayoutModule, NbDatepickerModule, NbToastrModule, NbMenuModule, NbSidebarModule, NbActionsModule, NbUserModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DataTablesModule } from 'angular-datatables';
import { DashboardModule } from './dashboard/dashboard.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
    declarations: [
        AppComponent,
        GetInfoComponent,
        CountryComponent,
        EditCountryComponent,
        ExamplePdfViewerComponent,
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
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
        NbSidebarModule.forRoot(),
        NgxExtendedPdfViewerModule,
        NbActionsModule,
        NbActionsModule,
        NbUserModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
