import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectInformationComponent } from './collect-information/collect-information.component';

const routes: Routes = [
  {path:'collect-information',component:CollectInformationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationRoutingModule { }
