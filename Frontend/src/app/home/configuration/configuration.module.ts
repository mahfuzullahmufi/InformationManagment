import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DataTablesModule } from 'angular-datatables';
import { MenuSettingComponent } from './menu-setting/menu-setting.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    MenuSettingComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NbSelectModule,
    NbIconModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule, 
    NbEvaIconsModule,
    DataTablesModule,
    NbCheckboxModule,
    NbLayoutModule
  ]
})
export class ConfigurationModule { }
