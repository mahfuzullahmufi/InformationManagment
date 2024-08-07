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
    return this.http.get<ICountry>(this.baseUrl + 'Country/get-country-list');
  }

  getCities(){
    return this.http.get<ICity>(this.baseUrl + 'City/get-city-list')
  }

  getAllLanguage(){
    return this.http.get(this.baseUrl + 'Language/get-language-list')
  }

  infoSave(data:any){
    debugger;
    return this.http.post(this.baseUrl+'Person/add-or-update-person',data);
  }
  
  getInfo() {
    return this.http.get<IInfoData>(this.baseUrl + 'Person/get-person-list');
  };

  deleteInfo(id : any){    
    return this.http.delete(`${this.baseUrl}Person/delete-person?Id=${id}`);
  }

  getInformationById(id : any){    
    return this.http.get(`${this.baseUrl}Person/get-person-by-id?Id=${id}`);
  }
}
