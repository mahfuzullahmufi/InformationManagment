import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationRoutingModule } from './information-routing.module';
import { CollectInformationComponent } from './collect-information/collect-information.component';


@NgModule({
  declarations: [
    CollectInformationComponent
  ],
  imports: [
    CommonModule,
    InformationRoutingModule,
    
  ]
})
export class InformationModule { }
