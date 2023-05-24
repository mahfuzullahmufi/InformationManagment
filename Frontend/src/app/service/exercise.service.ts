import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) { } 
  
  // getPoultryCustomers(validDate: string) {
  //   return this.http.get<any>(
  //     `${environment.apiUrl}get-poultry-by-date?validDate=` + validDate
  //   );
  // }
}
