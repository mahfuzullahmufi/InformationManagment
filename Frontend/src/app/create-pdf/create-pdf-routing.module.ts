import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfPracticeComponent } from './pdf-practice/pdf-practice.component';

const routes: Routes = [
  {path:'practice-report-generate',component:PdfPracticeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePdfRoutingModule { }
