import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbThemeModule, NbLayoutModule, NbDatepickerModule, NbToastrModule, NbMenuModule, NbSidebarModule, NbActionsModule, NbUserModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DataTablesModule } from 'angular-datatables';
import { DashboardModule } from './dashboard/dashboard.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { LayoutModule } from './layout/layout.module';
import { AuthInterceptor } from './authentication/auth.interceptor';

@NgModule({
    declarations: [
        AppComponent,
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
        NbUserModule,
        LayoutModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ]
})
export class AppModule { }
