import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { City } from '../../models/city.model';
import { Country } from '../../models/country.model';
import { GetInfoService } from './get-info.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageModel } from '../../models/language.model';
import { InfoModel } from '../../models/info.model';
 

@Component({
  selector: 'app-get-info',
  templateUrl: './get-info.component.html',
  styleUrls: ['./get-info.component.css']
})
export class GetInfoComponent implements OnInit {
  saveInfoForm: FormGroup;
  languageFormArray:FormArray;
  countries: Country[];
  cities: City[];
  city: City[];
  lstLanguage: LanguageModel[];
  selectionLanguage:LanguageModel[]=[];
  infodata: InfoModel[];
  

  file : {
    fileBase64: any,
    fileTypes: any,
    fileNames: any
  };

  constructor(
    private _getInfoService: GetInfoService, 
    private _fb:FormBuilder,
    ) { }

  addCountry = new FormGroup ( {
  countryName : new FormControl ('')
  });

  ngOnInit(): void {
    this.getCountries();
    this.getCities();
    this.getAllLanguages();
    //this.getInformations();
    this.createForm();
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
    this.lstLanguage = res as LanguageModel[];
  });
}

onSelect(countries){
  this.city = this.cities.filter(e => e.countryId == countries.target.value);
}

getSelection(item:any) {
  return this.selectionLanguage.findIndex(s => s.id === item.id) !== -1;
}

// getInformations() {
//   this._showInfoService.getInfo().subscribe((response : any) => {
//     this.infodata = response;
//   }, error => {
//     console.log(error);
//   })
// }

changeHandler(item: any) {
  const id = item.id;
  const index = this.selectionLanguage.findIndex(u => u.id === id);
  if (index === -1) {
    this.selectionLanguage = [...this.selectionLanguage, item];
    this.languageFormArray = this._fb.array([]);
    this.selectionLanguage.forEach(p=>{
      this.languageFormArray.push(new FormGroup({
        id: new FormControl(p.id),
        languageName: new FormControl(p.name),
 }))
    })

  } else {
    this.selectionLanguage = this.selectionLanguage.filter(language => language.id !== item.id)
    this.languageFormArray = this._fb.array([]);

    this.selectionLanguage.forEach(p=>{
      this.languageFormArray.push(new FormGroup({
        id: new FormControl(p.id),
        languageName: new FormControl(p.name),
 }))
    })
  }
}

refresh(){
  this.createForm();
  //this.getInformations();
}

submitForm(){
  this.saveInfoForm.patchValue({
    languageList: this.languageFormArray.value,
  })
  console.log("this.saveInfoForm",this.formVal);
  // if (this.saveInfoForm?.invalid) {
  //   //this._toasterService.error("Please fill the all required fields", "Invalid submission");
  //   console.log("Please fill the all required fields", "Invalid submission");
    
  //   return;
  // }
  
  this._getInfoService.infoSave(this.formVal).subscribe(
    (res: any) => {
      console.log(res);
      
      if(res){
        console.log("Success!");
        this.ngOnInit();
        //this.refresh();
      }      
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


createForm(){
  this.saveInfoForm=this._fb.group({
   id:[0,[]],
   name:[,[Validators.required]],
   countryId:[,[]],
   cityId:[,[Validators.required]],
   dateOfBirth:[,[Validators.required]],
   languageList:[[],[Validators.required]],
   document:[,[]],
  })
this.languageFormArray = this._fb.array([]);

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

fileDownload(id) {
  let fullFIle =
    this.infodata[id].fileTypes + "," + this.infodata[id].fileBase64;

  let a = document.createElement("a");
  a.download = `${this.infodata[id].fileNames}`;
  a.href = fullFIle;
  a.click();
}

}
