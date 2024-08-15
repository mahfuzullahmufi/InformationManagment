import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { InfoModel } from 'src/app/models/info.model';
import { InfoData } from 'src/app/models/infodata.model';
import { LanguageModel } from 'src/app/models/language.model';
import { ExcelServiceService } from 'src/app/services/ExcelService/excel-service.service';
import { Examplepdfservice } from 'src/app/services/PdfService/Example-pdf-service';
import { AllInfoReportService } from 'src/app/services/PdfService/all-info-report.service';
import { InformationService } from '../../../services/information.service';

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
  isTrue = false;
  examplePdf: any;

  constructor(
    private infoService: InformationService,
    private toasterService: NbToastrService,
    private router: Router,
    private pdfService: AllInfoReportService,
    private excelService: ExcelServiceService,
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.getInformations();
  }

  getInformations(): void {
    this.infoService.getInfo().subscribe(
      (response: any) => {
        this.infodata = response as InfoModel[];
        this.dtTrigger.next(this.infodata);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formatLanguages(languages: LanguageModel[]): string {
    return languages.map((lang) => lang.name).join(', ');
  }

  fileDownload(id: number): void {
    const fullFile = `${this.infodata[id].fileTypes},${this.infodata[id].fileBase64}`;
    const a = document.createElement("a");
    a.download = this.infodata[id].fileNames;
    a.href = fullFile;
    a.click();
  }

  editInformation(id: number): void {
    this.router.navigate(["/information/collect-information", id]);
  }

  deletePersonInformation(id: number): void {
    this.infoService.deleteInfo(id).subscribe(
      (res: any) => {
        if (res) {
          this.toasterService.danger("Information has been Deleted.", "Delete");
          this.reRender();
        }
      },
      (er) => {
        this.toasterService.danger("Something went wrong!", "Error");
      }
    );
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

  onChangeExportType(event: number): void {
    if (event === 1) {
      const fileName = "Information Lists";
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`;
      link.click();
    } else if (event === 2 || event === 3) {
      const excelObj = {
        data: this.docData.docDefinition.content[1].table.body,
      };

      setTimeout(() => {
        const exporter = this.excelService.downloadExcelFile(excelObj, "Information Lists");
        //@ts-ignore
        if (exporter.payload.data.length > 0) {
          // Handle success
        }
      }, 800);
    }
  }

  generatePdf(): void {
    this.docData = this.pdfService.generatePdf(this.infodata);
    this.docData.getBase64((base64Data) => {
      this.report = base64Data;
      this.documentTitle = this.docData.docDefinition.info.title;
      this.isTrue = true;
    });
  }

  onSearchAgain(): void {
    this.isTrue = false;
  }
}
