import { Component, OnInit, VERSION } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-startup-page',
  templateUrl: './startup-page.component.html',
  styleUrls: ['./startup-page.component.css']
})
export class StartupPageComponent implements OnInit {

  name = 'Angular ' + VERSION.major;
  chart: any;
   
   
  constructor() {

  }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Total Saved Information', 'Total Uploaded Resume','Total Generated PDF' ],
	       datasets: [{
    label: 'Amount',
    data: [5, 3, 2],
    backgroundColor: [
      'FireBrick',
      'MediumTurquoise',
			'Gold',			
    ],
    hoverOffset: 4
  }],
      },
      options: {
        aspectRatio:2.5
      }

    });
  }


}
