import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import dayjs from 'dayjs';
import { DataTableDirective } from "angular-datatables";

import { ICity } from 'src/app/models/city';
import { ICountry } from 'src/app/models/country';
import { InfoModel } from 'src/app/models/info.model';
import { LanguageModel } from 'src/app/models/language.model';
import { InformationService } from 'src/app/services/information.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-collect-information',
  templateUrl: './collect-information.component.html',
  styleUrls: ['./collect-information.component.css']
})
export class CollectInformationComponent implements OnInit {

  saveInfoForm: FormGroup;
  languageFormArray:FormArray;
  countries: ICountry[];
  cities: ICity[];
  city: ICity[];
  lstLanguage: LanguageModel[];
  selectionLanguage:LanguageModel[]=[];
  infodata: InfoModel[];
  file : {
    fileBase64: any,
    fileTypes: any,
    fileNames: any
  };
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  personInfo: any;

  constructor(
    private _fb:FormBuilder,
    private _infoService: InformationService, 
    private _toasterService: NbToastrService,
    
    ) { }

  addCountry = new FormGroup ( {
  countryName : new FormControl ('')
  });

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.getCountries();
    this.getCities();
    this.getAllLanguages();
    this.getInformations();
    this.createForm();
}

getCountries(){
  this._infoService.getCountries().subscribe((response : any) => {
    this.countries = response;
  }, error => {
    console.log(error);
  })
}

getCities(){
  this._infoService.getCities().subscribe((response : any) => {
    this.cities = response;
  },
   error => {
    console.log(error);
  });
}

getAllLanguages(){
  this._infoService.getAllLanguage().subscribe(res => {
    this.lstLanguage = res as LanguageModel[];
  });
}

citySelect(event){
  this.city = this.cities.filter(e => e.countryID == event);
}

getSelection(item:any) {
  return this.selectionLanguage.findIndex(s => s.id === item.id) !== -1;
}

getInformations() {
  this._infoService.getInfo().subscribe((response : any) => {
    this.infodata = response;
    this.dtTrigger.next(this.infodata);
    //this.reRender;
  }, error => {
    console.log(error);
  })
}

changeHandler(item: any) {
  const id = item.id;
  const index = this.selectionLanguage.findIndex(u => u.id === id);
  if (index === -1) {
    this.selectionLanguage = [...this.selectionLanguage, item];
    this.languageFormArray = this._fb.array([]);
    this.selectionLanguage.forEach(p=>{
      this.languageFormArray.push(new FormGroup({
        id: new FormControl(p.id),
        languageName: new FormControl(p.languageName),
 }))
    })

  } else {
    this.selectionLanguage = this.selectionLanguage.filter(language => language.id !== item.id)
    this.languageFormArray = this._fb.array([]);

    this.selectionLanguage.forEach(p=>{
      this.languageFormArray.push(new FormGroup({
        id: new FormControl(p.id),
        languageName: new FormControl(p.languageName),
 }))
    })
  }
}

dateChange(event: any){  
  let changesDate=dayjs(event).format("DD-MM-YYYY");
  this.saveInfoForm.patchValue({
    dateOfBirth:changesDate
  })
}

// refresh(){
//   this.createForm();
//   //this.getInformations();
// }

submitForm(){
  this.saveInfoForm.patchValue({
    countryId: this.saveInfoForm.value.countryId.toString(),
    cityId: this.saveInfoForm.value.cityId.toString(),
    languageList: this.languageFormArray.value,
  })
  console.log("this.saveInfoForm",this.formVal);
  if (this.saveInfoForm?.invalid) {
    this._toasterService.danger("Please fill the all required fields", "Invalid submission");
    return;
  }
  
  this._infoService.infoSave(this.formVal).subscribe(
    (res: any) => {
      console.log(res);
      
      if(res){
        this._toasterService.success("Information has been Saved ", "Success");
        //this.ngOnInit();
        this.reRender();
      }      
    },
    (er) => {
        this._toasterService.danger("Something went wrong!","Error");
        this.reRender();
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
   countryId:[,[Validators.required]],
   cityId:[,[Validators.required]],
   dateOfBirth:[,[]],
   languageList:[[],[]],
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

getInformationById(id){
  this._infoService.getInformationById(id).subscribe((res:any) => {
    console.log(res);
    this.saveInfoForm.patchValue({
      name:res.name,
      countryId:res.countryId,
      cityId:res.cityId,
      dateOfBirth:res.dateOfBirth
    })
    this.selectionLanguage = res.languageList
    this.personInfo=res;
  },
  (er) => {
      this._toasterService.danger("Something went wrong!","Error");
  });
}

deletePersonInformation(id){
   this._infoService.deleteInfo(id).subscribe((res:any) => {
    if(res){
      this._toasterService.danger("Information has been Deleted.", "Delete");
      this.reRender();
    } 
  },
  (er) => {
      this._toasterService.danger("Something went wrong!","Error");
  });
   
}

reRender(): void {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.destroy();
    this.selectionLanguage = [];
    this.createForm();
    this.getInformations();
  });
}

ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}

}
