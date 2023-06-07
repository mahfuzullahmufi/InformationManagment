import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationRoutingModule } from './information-routing.module';
import { CollectInformationComponent } from './collect-information/collect-information.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DataTablesModule } from 'angular-datatables';
import { ViewInformationComponent } from './view-information/view-information.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerComponent } from '../generate-pdf/pdf-viewer/pdf-viewer.component';


@NgModule({
  declarations: [
    CollectInformationComponent,
    ViewInformationComponent
  ],
  imports: [
    CommonModule,
    InformationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule, 
    NbEvaIconsModule,
    DataTablesModule,
    NgxExtendedPdfViewerModule,
    
  ]
})
export class InformationModule { }
