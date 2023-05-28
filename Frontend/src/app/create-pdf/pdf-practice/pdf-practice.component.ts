import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-pdf-practice',
  templateUrl: './pdf-practice.component.html',
  styleUrls: ['./pdf-practice.component.css']
})
export class PdfPracticeComponent implements OnInit {
  isProgress: boolean;
  submitted: boolean;
  poultryCustomerList: any;
  docData: any;
  documentTitle: "";
  pdfDate: "202301";

  constructor(
    // private _poultryService:ExerciseService,
  ) { }

  ngOnInit(): void {
  }
  
//   onReport() {
//     this._poultryService.getPoultryCustomers(this.pdfDate).subscribe(res => {
//       this.poultryCustomerList = res.data;
//       if (this.poultryCustomerList.length > 0) {
//         //this.docData = this._poultryService.generatePdf(this.poultryCustomerList, this.pdfDate);
//         this.docData.getBase64((base64Data) => {
//           this.onReport = base64Data;
//           this.documentTitle = this.docData.docDefinition.info.title;
//         });
//       }
//   })
// }
}
