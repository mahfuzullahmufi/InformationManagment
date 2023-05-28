import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticePdfComponent } from './practice-pdf/practice-pdf.component';

const routes: Routes = [
  { path : 'practice-pdf',component:PracticePdfComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneratePdfRoutingModule { }
