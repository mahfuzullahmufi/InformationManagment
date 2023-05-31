import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { InfoModel } from 'src/app/models/info.model';
import { InformationService } from 'src/app/services/information.service';

@Component({
  selector: 'app-view-information',
  templateUrl: './view-information.component.html',
  styleUrls: ['./view-information.component.css']
})
export class ViewInformationComponent implements OnInit {

  infodata: InfoModel[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(
    private _infoService: InformationService, 
    private _toasterService: NbToastrService,
    private _router: Router,
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
      this.dtTrigger.next(this.infodata);
      //this.reRender;
    }, error => {
      console.log(error);
    })
  }

  fileDownload(id) {
    let fullFIle =
      this.infodata[id].fileTypes + "," + this.infodata[id].fileBase64;
  
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

}
