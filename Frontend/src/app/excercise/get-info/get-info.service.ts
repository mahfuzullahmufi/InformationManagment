import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../../models/city.model';
import { Country } from '../../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class GetInfoService {
  baseUrl = 'https://localhost:7258/api/';

  constructor(private http: HttpClient) { }

  getCountries(){
    return this.http.get<Country>(this.baseUrl + 'Country/get-all-country');
  }

  getCities(){
    return this.http.get<City>(this.baseUrl + 'City/get-all-cities')
  }

  getAllLanguage(){
    return this.http.get(this.baseUrl + 'Language/get-all-Language')
  }

  infoSave(data:any){
    debugger;
    return this.http.post(this.baseUrl+'Information',data);
  }
}
