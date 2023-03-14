import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICountry } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  baseUrl = 'https://localhost:7258/api/Country';

  constructor(private http: HttpClient) { }
  
  getCountries(){
    return this.http.get<ICountry>(this.baseUrl);
  }

  createCountry(data : any) {
    return this.http.post(this.baseUrl, data);
  };

  deleteCountry(id : any){    
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getCountryById(id :any) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateCountry(id : any, data : any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
}
