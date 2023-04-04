import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ICity } from '../models/city';
import { ICountry } from '../models/country';
import { GetInfoService } from './get-info.service';
import { FormControl, FormGroup } from '@angular/forms';
 

@Component({
  selector: 'app-get-info',
  templateUrl: './get-info.component.html',
  styleUrls: ['./get-info.component.css']
})
export class GetInfoComponent implements OnInit {
  infoSaveform: FormGroup;
  countries: ICountry[];
  cities: ICity[];
  city: ICity[];

  constructor(private getInfoService: GetInfoService, private http : HttpClient) { 
    
  }

  addCountry = new FormGroup ( {
  countryName : new FormControl ('')
  });

  ngOnInit(): void {
    this.getCountries()
    this.getCities()
}

getCountries(){
  this.getInfoService.getCountries().subscribe((response : any) => {
    this.countries = response;
  }, error => {
    console.log(error);
  })
}

getCities(){
  this.getInfoService.getCities().subscribe((response : any) => {
    this.cities = response;
  },
   error => {
    console.log(error);
  });
}

onSelect(countries){
  // console.log(countrys.target.value);
  this.city = this.cities.filter(e => e.countryID == countries.target.value);
}

submitForm(){
  
}

}
