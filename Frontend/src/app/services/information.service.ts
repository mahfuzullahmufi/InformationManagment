import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICountry } from '../models/country';
import { ICity } from '../models/city';
import { environment } from 'src/environments/environment';
import { IInfoData } from '../models/infodata';

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  baseUrl:string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCountries(){
    return this.http.get<ICountry>(this.baseUrl + 'Country/get-all-country');
  }

  getCities(){
    return this.http.get<ICity>(this.baseUrl + 'City/get-all-cities')
  }

  getAllLanguage(){
    return this.http.get(this.baseUrl + 'Language/get-all-Language')
  }

  infoSave(data:any){
    return this.http.post(this.baseUrl+'Information',data);
  }
  
  getInfo() {
    return this.http.get<IInfoData>(this.baseUrl + 'Information');
  };

  deleteInfo(id : any){    
    return this.http.delete(`${this.baseUrl}Information/${id}`);
  }

  getInformationById(id : any){    
    return this.http.get(`${this.baseUrl}Information/${id}`);
  }

  infoUpdate(data:any, id:number){
    debugger;
    return this.http.put(this.baseUrl+'Information/'+id,data);
  }
}
