import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {

  @Input() documentTitle: any

  @Input() report: any=''
  constructor() {
  }

  ngOnInit(): void {
  }

}
