import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneratePdfRoutingModule } from './generate-pdf-routing.module';
import { PracticePdfComponent } from './practice-pdf/practice-pdf.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';


@NgModule({
  declarations: [
    PracticePdfComponent,
    PdfViewerComponent
  ],
  imports: [
    CommonModule,
    GeneratePdfRoutingModule,
    NgxExtendedPdfViewerModule
    
  ],
  exports:[
    PdfViewerComponent
  ]
})
export class GeneratePdfModule { }
