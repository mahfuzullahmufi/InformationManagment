import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectInformationComponent } from './collect-information/collect-information.component';
import { ViewInformationComponent } from './view-information/view-information.component';

const routes: Routes = [
  {path:'collect-information',component:CollectInformationComponent},
  {path:'view-information',component:ViewInformationComponent},
  {path:'collect-information/:id',component:CollectInformationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationRoutingModule { }
