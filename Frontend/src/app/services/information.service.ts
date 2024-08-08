import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country.model';
import { City } from '../models/city.model';
import { InfoData } from '../models/infodata.model';

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country> {
    return this.http.get<Country>(`${this.baseUrl}Country/get-country-list`);
  }

  getCities(): Observable<City> {
    return this.http.get<City>(`${this.baseUrl}City/get-city-list`);
  }

  getAllLanguages(): Observable<any> {
    return this.http.get(`${this.baseUrl}Language/get-language-list`);
  }

  saveInfo(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}Person/add-or-update-person`, data);
  }
  
  getInfo(): Observable<InfoData> {
    return this.http.get<InfoData>(`${this.baseUrl}Person/get-person-list`);
  }

  deleteInfo(id: any): Observable<any> {    
    return this.http.delete(`${this.baseUrl}Person/delete-person?Id=${id}`);
  }

  getInformationById(id: any): Observable<any> {    
    return this.http.get(`${this.baseUrl}Person/get-person-by-id?Id=${id}`);
  }
}
