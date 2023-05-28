import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneratePdfRoutingModule } from './generate-pdf-routing.module';
import { PracticePdfComponent } from './practice-pdf/practice-pdf.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';


@NgModule({
  declarations: [
    PracticePdfComponent
  ],
  imports: [
    CommonModule,
    GeneratePdfRoutingModule,
    NgxExtendedPdfViewerModule,
    
  ]
})
export class GeneratePdfModule { }
