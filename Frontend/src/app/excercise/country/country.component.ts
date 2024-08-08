import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from '../../models/country.model';
import { CountryService } from './country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countries: Country[];
  addCountry: FormGroup;
  country: Country;
  message : boolean = false;
  isSubmit: boolean = true;
  countryId: any;

  // addCountry = new FormGroup ( {
  //   countryName : new FormControl ('')
  //   });


  constructor(
    private _fb: FormBuilder,
    private countryService: CountryService, 
    private http : HttpClient, 
    private router : Router
    ) { }

  ngOnInit(): void {
    this.createForm(),
    this.getCountries()
  }

  submitForm() {
    this.countryService.createCountry(this.addCountry.value).subscribe((result) => {
         this.message = true;
         this.addCountry.reset( {} );
         this.getCountries()
  });
}

  removeMessage(){
    this.message = false;
  }

  getCountries(){
    this.countryService.getCountries().subscribe((response : any) => {
      this.countries = response;
    }, error => {
      console.log(error);
    })
  }

  editCountry(item:Country) {
   // this.countryId = id;
    this.isSubmit = false;
    this.addCountry.patchValue({
      id: item.id,
      countryName: item.name
    })
    // //this.router.navigate(['/editCountry', id])
    // this.countryService.getCountryById(id).subscribe((res) => {
    //   this.country = res as ICountry;
    //   this.addCountry.patchValue({
    //     id: this.country.id,
    //     countryName:this.country.countryName
    //   })
    // });
  }

  updateCountry(){
    this.countryService.updateCountry(this.addCountry.value.id, this.addCountry.value).subscribe((result) => {
      this.message = true;
      this.addCountry.reset( {} );
      this.getCountries()
    });
    this.isSubmit = true;

  }

  deleteCountry(id) {
    this.countryService.deleteCountry(id).subscribe((result) => {
      this.ngOnInit(); 
    })
    
  }

  createForm() {
    this.addCountry = this._fb.group({
      id: [0,[]],
      countryName: [, [Validators.required]],
    });
  }

  get formVal() {
    return this.addCountry.value;
  }

  get f() {
    return this.addCountry.controls;
  }

}
