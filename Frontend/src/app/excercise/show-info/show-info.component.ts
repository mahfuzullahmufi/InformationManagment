import { Component, OnInit } from '@angular/core';
import { IInfoData } from '../../models/infodata.model';
import { ShowInfoService } from './show-info.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.css']
})
export class ShowInfoComponent implements OnInit {
  
  infodata: IInfoData[];
  infos: any[];
  totalCount: number;

  constructor(private showInfoService : ShowInfoService, private http: HttpClient) { }

  // ngOnInit(): void {
  //   this.http.get('https://localhost:7258/api/Information').subscribe((response : any) => {
  //     this.infos = response;
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  ngOnInit(): void {
    this.getInformations()
  }

  getInformations() {
    this.showInfoService.getInfo().subscribe((response : any) => {
      this.infodata = response;
    }, error => {
      console.log(error);
    })
  }


}

  

