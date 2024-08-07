import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NbToastrService } from "@nebular/theme";
import dayjs from "dayjs";
import { DataTableDirective } from "angular-datatables";

import { ICity } from "src/app/models/city";
import { ICountry } from "src/app/models/country";
import { InfoModel } from "src/app/models/info.model";
import { LanguageModel } from "src/app/models/language.model";
import { InformationService } from "src/app/services/information.service";
import { Subject } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "ngx-collect-information",
  templateUrl: "./collect-information.component.html",
  styleUrls: ["./collect-information.component.css"],
})
export class CollectInformationComponent implements OnInit {
  saveInfoForm: FormGroup;
  languageFormArray: FormArray;
  countries: ICountry[];
  cities: ICity[];
  city: ICity[];
  lstLanguage: LanguageModel[];
  selectionLanguage: LanguageModel[] = [];
  file: {
    fileBase64: any;
    fileTypes: any;
    fileNames: any;
  };

  personInfo: any;
  information: InfoModel;
  isEditable: boolean = false;
  infoId: number = 0;
  showfilename: string;

  constructor(
    private _fb: FormBuilder,
    private _infoService: InformationService,
    private _toasterService: NbToastrService,
    private _activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCities();
    this.getCountries();
    this.getAllLanguages();
    this.createForm();
    if (this._activateRoute.snapshot.paramMap.get("id") !== null) {
      let id = this._activateRoute.snapshot.paramMap.get("id");
      this.infoId = Number(id);
      this.getInformationById(id);
      this.isEditable = true;
    }
  }

  getCountries() {
    this._infoService.getCountries().subscribe(
      (response: any) => {
        this.countries = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCities() {
    this._infoService.getCities().subscribe(
      (response: any) => {
        this.cities = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllLanguages() {
    this._infoService.getAllLanguage().subscribe((res) => {
      this.lstLanguage = res as LanguageModel[];
    });
  }

  citySelect(event) {
    if(this.cities != undefined){
      this.city = this.cities.filter((e) => e.countryId == event);
    }
  }

  getSelection(item: any) {
    return this.selectionLanguage.findIndex((s) => s.id === item.id) !== -1;
  }

  changeHandler(item: any) {
    const id = item.id;
    const index = this.selectionLanguage.findIndex((u) => u.id === id);
    if (index === -1) {
      this.selectionLanguage = [...this.selectionLanguage, item];
      this.languageFormArray = this._fb.array([]);
      this.selectionLanguage.forEach((p) => {
        this.languageFormArray.push(
          new FormGroup({
            id: new FormControl(p.id),
            name: new FormControl(p.name),
          })
        );
      });
    } else {
      this.selectionLanguage = this.selectionLanguage.filter(
        (language) => language.id !== item.id
      );
      this.languageFormArray = this._fb.array([]);

      this.selectionLanguage.forEach((p) => {
        this.languageFormArray.push(
          new FormGroup({
            id: new FormControl(p.id),
            name: new FormControl(p.name),
          })
        );
      });
    }
  }

  dateChange(event: any) {
    let date = dayjs(event);
    
    let changesDate = date.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    console.log("event", date);
    this.saveInfoForm.patchValue({
      dateOfBirth: changesDate,
    });
  }

  refresh() {
    this.selectionLanguage = [];
    this.showfilename = null;
    this.createForm();
  }

  submitForm() {
    this.saveInfoForm.patchValue({
      id: this.infoId,
      countryId: this.saveInfoForm.value.countryId.toString(),
      cityId: this.saveInfoForm.value.cityId.toString(),
      personLanguages: this.languageFormArray.value,
    });
    console.log("this.saveInfoForm", this.formVal);
    if (this.saveInfoForm?.invalid) {
      this._toasterService.danger(
        "Please fill the all required fields",
        "Invalid submission"
      );
      return;
    }

    this._infoService.infoSave(this.formVal).subscribe(
      (res: any) => {
        console.log("Response",res);

        if (res) {
          this._toasterService.success(
            "Information has been Saved ",
            "Success"
          );
          this.refresh();
        }
      },
      (er) => {
        this._toasterService.danger("Something went wrong!", "Error");
        console.log("error",er);
        // this.refresh();
      }
    );
  }

  updateInfo() {
    this.saveInfoForm.patchValue({
      countryId: this.saveInfoForm.value.countryId.toString(),
      cityId: this.saveInfoForm.value.cityId.toString(),
      personLanguages: this.languageFormArray.value,
    });
    console.log("this.saveInfoForm", this.formVal);
    if (this.saveInfoForm?.invalid) {
      this._toasterService.danger(
        "Please fill the all required fields",
        "Invalid submission"
      );
      return;
    }
    this._infoService.infoSave(this.formVal).subscribe(
      (res: any) => {
        if (res) {
          this._toasterService.success(
            "Information has been Updated ",
            "Success"
          );
          this.refresh();
          this.isEditable = false;
        }
      },
      (er) => {
        this._toasterService.danger("Something went wrong!", "Error");
        this.refresh();
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
          this.showfilename=event.target.files[i].name;
          this.file = {
            fileBase64: base64[1],
            fileTypes: base64[0],
            fileNames: event.target.files[i].name,
          };
          this.saveInfoForm.patchValue({
            fileBase64: this.file.fileBase64,
            fileTypes: this.file.fileTypes,
            fileNames: this.file.fileNames,
          });
        };
      }
    }
  }

  createForm() {
    this.saveInfoForm = this._fb.group({
      id: [0, []],
      name: [, [Validators.required]],
      countryId: [, [Validators.required]],
      cityId: [, [Validators.required]],
      dateOfBirth: [, []],
      personLanguages: [[], []],
      fileBase64: [, []],
      fileTypes: [, []],
      fileNames: [, []],
    });
    this.languageFormArray = this._fb.array([]);
  }

  get formVal() {
    return this.saveInfoForm?.value;
  }
  get f() {
    return this.saveInfoForm?.controls;
  }
  get detailsFormAllVal() {
    return this.languageFormArray.value;
  }

  getInformationById(id) {
    this._infoService.getInformationById(id).subscribe(
      (res: any) => {
        this.information = res as InfoModel;
        console.log("info", this.information);
        this.saveInfoForm.patchValue({
          id: this.infoId,
          name: this.information.name,
          countryId: Number(this.information.countryId),
          dateOfBirth: this.information.dateOfBirth,
        });
        this.citySelect(this.saveInfoForm.value.countryId);
        this.saveInfoForm.patchValue({
          cityId: Number(this.information.cityId),
        });
        this.selectionLanguage = this.information.personLanguages;
        this.selectionLanguage.forEach((p) => {
          this.languageFormArray.push(
            new FormGroup({
              id: new FormControl(p.id),
              name: new FormControl(p.name),
            })
          );
        });
        this.file = {
          fileBase64: this.information.fileBase64,
          fileTypes: this.information.fileTypes,
          fileNames: this.information.fileNames,
        };
        this.showfilename = this.information.fileNames;
      },
      (er) => {
        this._toasterService.danger("Something went wrong!", "Error");
      }
    );
  }

  fileDownload() {
    let fullFIle = this.file.fileTypes + "," + this.file.fileBase64;
    let a = document.createElement("a");
    a.download = `${this.file.fileNames}`;
    a.href = fullFIle;
    a.click();
  }
  fileDelete() {
    this.file.fileNames=null;
    this.file.fileBase64=null;
    this.file.fileTypes=null;
    this.showfilename=null;
  }
}
