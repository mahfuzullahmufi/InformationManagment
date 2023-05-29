import { Component, Input, OnInit } from '@angular/core';
import { Examplepdfservice } from '../pdfmake Service/Example-pdf-service';

@Component({
  selector: 'app-practice-pdf',
  templateUrl: './practice-pdf.component.html',
  styleUrls: ['./practice-pdf.component.css']
})
export class PracticePdfComponent implements OnInit {
  docData: any;
  report: any;
  documentTitle = "";
  isTrue: boolean = false;

  
  constructor(
    private _pdfService : Examplepdfservice
  ) {
  }

  ngOnInit(): void {
  
  }

  generateReport() {
    this.isTrue = true;
    this.docData = this._pdfService.generatePdf();
    this.docData.getBase64((base64Data) => {
      this.report = base64Data;
      this.documentTitle = this.docData.docDefinition.info.title;
    });
    console.log("this.docData",this.docData);
    console.log("this.report",this.report);
    console.log("this.documentTitle",this.documentTitle);
    
  
}

}
