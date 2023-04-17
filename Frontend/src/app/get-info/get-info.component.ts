import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ICity } from '../models/city';
import { ICountry } from '../models/country';
import { GetInfoService } from './get-info.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageModel } from '../models/language.model';
 

@Component({
  selector: 'app-get-info',
  templateUrl: './get-info.component.html',
  styleUrls: ['./get-info.component.css']
})
export class GetInfoComponent implements OnInit {
  saveInfoForm: FormGroup;
  public languageFormArray:FormArray;
  countries: ICountry[];
  cities: ICity[];
  city: ICity[];
  languageList: LanguageModel[];

  file : {
    fileBase64: any,
    fileTypes: any,
    fileNames: any
  };

  constructor(
    private _getInfoService: GetInfoService, 
    private http : HttpClient,
    private fb:FormBuilder,
    
    ) { }

  addCountry = new FormGroup ( {
  countryName : new FormControl ('')
  });

  ngOnInit(): void {
    this.getCountries();
    this.getCities();
    this.getAllLanguages();
    this.creatForm();
}

getCountries(){
  this._getInfoService.getCountries().subscribe((response : any) => {
    this.countries = response;
  }, error => {
    console.log(error);
  })
}

getCities(){
  this._getInfoService.getCities().subscribe((response : any) => {
    this.cities = response;
  },
   error => {
    console.log(error);
  });
}

getAllLanguages(){
  this._getInfoService.getAllLanguage().subscribe(res => {
    this.languageList = res as LanguageModel[];
  });
}

onSelect(countries){
  // console.log(countrys.target.value);
  this.city = this.cities.filter(e => e.countryID == countries.target.value);
}

getSelection(item:any) {
  return this.languageList.findIndex(s => s.id === item.id) !== -1;
}

changeHandler(item: any) {
  const id = item.id;
  const index = this.languageList.findIndex(u => u.id === id);
  if (index === -1) {
    this.languageList = [...this.languageList, item];
    this.languageFormArray = this.fb.array([]);
    this.languageList.forEach(p=>{
      this.languageFormArray.push(new FormGroup({
        id: new FormControl(p.id),
        languageName: new FormControl(p.languageName),
 }))
    })

  } else {
    this.languageList = this.languageList.filter(language => language.id !== item.id)
    this.languageFormArray = this.fb.array([]);

    this.languageList.forEach(p=>{
      this.languageFormArray.push(new FormGroup({
        id: new FormControl(p.id),
        languageName: new FormControl(p.languageName),
 }))
    })
  }
}

submitForm(){
  console.log("this.saveInfoForm",this.formVal);
  this._getInfoService.infoSave(this.formVal).subscribe(
    (res: any) => {
      console.log("res",res);
      
    },
    (er) => {
      //this._toasterService.danger(er.message);
    }
  );
}

onFileSelected(event) {
  if (event.target.files) {
    for (let i = 0; i < event.target.files.length; i++) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      reader.onload = (reader: any) => {
        const result = reader.target.result;
        const base64 = reader.target.result.split(",");

        this.file = {
          fileBase64: base64[1],
          fileTypes: base64[0],
          fileNames: event.target.files[i].name,
        };
        this.saveInfoForm.patchValue({
          document: this.file
        })        
      };
    }
  }
}


creatForm(){
  this.saveInfoForm=this.fb.group({
   id:[0,[]],
   name:[,[Validators.required]],
   countryId:[,[]],
   cityId:[,[Validators.required]],
   date:[,[Validators.required]],
   languageList:[[],[Validators.required]],
   document:[,[]],
   imageFile:[,[Validators.required]]
  })
this.languageFormArray = this.fb.array([]);

}

get formVal(){
  return this.saveInfoForm?.value
}
  get f(){
  return this.saveInfoForm?.controls
}
get detailsFormAllVal() {
  return this.languageFormArray.value;
}

}
