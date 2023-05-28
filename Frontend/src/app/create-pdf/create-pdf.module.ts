import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePdfRoutingModule } from './create-pdf-routing.module';
import { PdfPracticeComponent } from './pdf-practice/pdf-practice.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PdfPracticeComponent,
    PdfViewerComponent
  ],
  imports: [
    CommonModule,
    CreatePdfRoutingModule,
    NgxExtendedPdfViewerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    RouterModule
  ]
})
export class CreatePdfModule { }
