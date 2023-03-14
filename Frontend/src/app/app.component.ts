import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Information-Collector';
  infos: any[];

  constructor (private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://localhost:7258/api/Information').subscribe((response : any) => {
      this.infos = response;
    }, error => {
      console.log(error);
    });
    
  }
}
