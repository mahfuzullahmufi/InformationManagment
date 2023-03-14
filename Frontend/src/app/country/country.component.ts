import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ICountry } from '../models/country';
import { CountryService } from './country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countries: ICountry[];

  addCountry = new FormGroup ( {
    countryName : new FormControl ('')
    });


  constructor(private countryService: CountryService, private http : HttpClient, private router : Router) { }

  message : boolean = false;

  ngOnInit(): void {
    this.getCountries()
  }

  submitForm() {
    console.log(this.addCountry.value);
    this.countryService.createCountry(this.addCountry.value).subscribe((result) => {
         console.log(result);
         this.message = true;
         this.addCountry.reset( {} );
  })}

  removeMessage(){
    this.message = false;
  }

  getCountries(){
    this.countryService.getCountries().subscribe((response : any) => {
      this.countries = response;
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  deleteCountry(id) {
    console.log(id);
    this.countryService.deleteCountry(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit(); 
    })
    
  }

  editCountry(id) {
    //console.log(id); 
    this.router.navigate(['/editCountry', id])
  }

}
