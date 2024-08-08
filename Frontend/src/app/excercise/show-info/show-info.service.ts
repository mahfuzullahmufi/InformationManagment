import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IInfoData } from '../../models/infodata.model';


@Injectable({
  providedIn: 'root'
})
export class ShowInfoService {
  baseUrl = 'https://localhost:7258/api/';

  constructor(private http: HttpClient) { /*environment.baseUrl*/}
  
  getInfo() {
    return this.http.get<IInfoData>(this.baseUrl + 'Information');
  };
}
