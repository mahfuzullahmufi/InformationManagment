import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { InfoModel } from 'src/app/models/info.model';
import { Examplepdfservice } from 'src/app/services/PdfService/Example-pdf-service';
import { AllInfoReportService } from 'src/app/services/PdfService/all-info-report.service';
import { InformationService } from 'src/app/services/information.service';

@Component({
  selector: 'app-view-information',
  templateUrl: './view-information.component.html',
  styleUrls: ['./view-information.component.css']
})
export class ViewInformationComponent implements OnInit {

  infodata: InfoModel[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  docData: any;
  documentTitle = "";
  exportTypeList: any[] = [
    { id: 1, name: ".pdf" },
    { id: 2, name: ".xls" },
  ];
  report: any;
  isTrue: boolean = false;
  examplePdf: any;

  constructor(
    private _infoService: InformationService, 
    private _toasterService: NbToastrService,
    private _router: Router,
    private _pdfService: AllInfoReportService,
    private _pdfServiceEx: Examplepdfservice,
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.getInformations();
  }

  getInformations() {
    this._infoService.getInfo().subscribe((response : any) => {
      this.infodata = response as InfoModel[];
      console.log("infodata",this.infodata);
      
      this.dtTrigger.next(this.infodata);
    }, error => {
      console.log(error);
    })
  }

  fileDownload(id) {
    let fullFIle = this.infodata[id].fileTypes + "," + this.infodata[id].fileBase64;
    let a = document.createElement("a");
    a.download = `${this.infodata[id].fileNames}`;
    a.href = fullFIle;
    a.click();
  }

  editInformation(id) {
    this._router.navigate(["/information/collect-information",id]);
  }

  deletePersonInformation(id){
    this._infoService.deleteInfo(id).subscribe((res:any) => {
     if(res){
       this._toasterService.danger("Information has been Deleted.", "Delete");
       this.reRender();
     } 
   },
   (er) => {
       this._toasterService.danger("Something went wrong!","Error");
   });
    
 }
 
 reRender(): void {
   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
     dtInstance.destroy();
     this.getInformations();
   });
 }
 
 ngOnDestroy(): void {
   this.dtTrigger.unsubscribe();
 }

 generatePdf(){
  this.examplePdf = this._pdfServiceEx.generatePdf(this.infodata);
  // this.docData = this._pdfService.generatePdf(this.infodata);
  //           this.docData.getBase64((base64Data) => {
  //             this.report = base64Data;
  //             this.documentTitle = this.docData.docDefinition.info.title;
  //             this.isTrue = true;
  //           });  
    
  // this.examplePdf.getBase64((base64Data) => {
  //             this.report = base64Data;
  //             this.documentTitle = this.examplePdf.docDefinition.info.title;
  //             this.isTrue = true;
  //           });    
 }

 onSearchAgain(){
  this.isTrue = false;
 }

}
