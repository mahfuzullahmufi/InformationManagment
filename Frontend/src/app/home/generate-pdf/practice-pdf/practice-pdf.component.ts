import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-practice-pdf',
  templateUrl: './practice-pdf.component.html',
  styleUrls: ['./practice-pdf.component.css']
})
export class PracticePdfComponent implements OnInit {

  @Input() documentTitle: any

  @Input() report: any=''
  constructor() {
  }

  ngOnInit(): void {
    console.log("report",this.report)
    console.log("documentTitle",this.documentTitle)
  }

}
