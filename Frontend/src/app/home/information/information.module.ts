import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationRoutingModule } from './information-routing.module';
import { CollectInformationComponent } from './collect-information/collect-information.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    CollectInformationComponent
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
    DataTablesModule
  ]
})
export class InformationModule { }
