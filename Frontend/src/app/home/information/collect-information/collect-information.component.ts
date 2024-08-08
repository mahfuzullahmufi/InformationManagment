import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NbToastrService } from "@nebular/theme";
import dayjs from "dayjs";
import { Country } from "src/app/models/country.model";
import { InfoModel } from "src/app/models/info.model";
import { LanguageModel } from "src/app/models/language.model";
import { InformationService } from "src/app/services/information.service";
import { ActivatedRoute } from "@angular/router";
import { City } from "src/app/models/city.model";

@Component({
  selector: "ngx-collect-information",
  templateUrl: "./collect-information.component.html",
  styleUrls: ["./collect-information.component.css"],
})
export class CollectInformationComponent implements OnInit {
  saveInfoForm: FormGroup;
  languageFormArray: FormArray;
  countries: Country[];
  cities: City[];
  city: City[];
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
    private fb: FormBuilder,
    private infoService: InformationService,
    private toasterService: NbToastrService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCities();
    this.getCountries();
    this.getAllLanguages();
    this.createForm();
    if (this.activateRoute.snapshot.paramMap.has("id")) {
      this.infoId = Number(this.activateRoute.snapshot.paramMap.get("id"));
      this.getInformationById(this.infoId);
      this.isEditable = true;
    }
  }

  getCountries() {
    this.infoService.getCountries().subscribe(
      (response: any) => {
        this.countries = response as Country[];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCities() {
    this.infoService.getCities().subscribe(
      (response: any) => {
        this.cities = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllLanguages() {
    this.infoService.getAllLanguages().subscribe((res: any) => {
      this.lstLanguage = res;
    });
  }

  citySelect(event) {
    if (this.cities) {
      this.city = this.cities.filter((e) => e.countryId == event);
    }
  }

  getSelection(item: any) {
    return this.selectionLanguage.some((s) => s.id === item.id);
  }

  changeHandler(item: any) {
    const id = item.id;
    const index = this.selectionLanguage.findIndex((u) => u.id === id);
    if (index === -1) {
      this.selectionLanguage = [...this.selectionLanguage, item];
      this.languageFormArray = this.fb.array([]);
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
      this.languageFormArray = this.fb.array([]);

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
    const date = dayjs(event);
    const changesDate = date.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    this.saveInfoForm.get('dateOfBirth').setValue(changesDate, { emitEvent: false });
  }

  refresh() {
    this.selectionLanguage = [];
    this.showfilename = null;
    this.createForm();
  }

    submitForm() {
        this.saveInfoForm.patchValue({
            personLanguages: this.languageFormArray.value,
        });
    if (this.saveInfoForm.invalid) {
      this.toasterService.danger(
        "Please fill in all required fields",
        "Invalid submission"
      );
      return;
    }

    this.infoService.saveInfo(this.saveInfoForm.value).subscribe(
      (res: any) => {
        if (res) {
          this.toasterService.success(
            "Information has been saved",
            "Success"
          );
          this.refresh();
        }
      },
      (er) => {
        this.toasterService.danger("Something went wrong!", "Error");
      }
    );
  }

    updateInfo() {
        this.saveInfoForm.patchValue({
            personLanguages: this.languageFormArray.value,
        });
    if (this.saveInfoForm.invalid) {
      this.toasterService.danger(
        "Please fill in all required fields",
        "Invalid submission"
      );
      return;
    }

    this.infoService.saveInfo(this.saveInfoForm.value).subscribe(
      (res: any) => {
        if (res) {
          this.toasterService.success(
            "Information has been updated",
            "Success"
          );
          this.refresh();
          this.isEditable = false;
        }
      },
      (er) => {
        this.toasterService.danger("Something went wrong!", "Error");
      }
    );
  }

  onFileSelected(event) {
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
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
    this.saveInfoForm = this.fb.group({
      id: [0],
      name: [, [Validators.required]],
      countryId: [, [Validators.required]],
      cityId: [, [Validators.required]],
      dateOfBirth: [, []],
      personLanguages: [[]],
      fileBase64: [, []],
      fileTypes: [, []],
      fileNames: [, []],
    });
    this.languageFormArray = this.fb.array([]);
  }

  get formVal() {
    return this.saveInfoForm.value;
  }

  get f() {
    return this.saveInfoForm.controls;
  }

  get detailsFormAllVal() {
    return this.languageFormArray.value;
  }

  getInformationById(id) {
    this.infoService.getInformationById(id).subscribe(
      (res: InfoModel) => {
        this.information = res;
        this.saveInfoForm.patchValue({
          id: this.information.id,
          name: this.information.name,
          countryId: this.information.countryId,
          dateOfBirth: this.information.dateOfBirth,
        });
        this.citySelect(this.saveInfoForm.value.countryId);
        this.saveInfoForm.patchValue({
          cityId: this.information.cityId,
        });
        this.selectionLanguage = this.information.personLanguages;
        this.selectionLanguage.forEach((p) => {
          if (this.languageFormArray) {
            this.languageFormArray.push(
              new FormGroup({
                id: new FormControl(p.id),
                name: new FormControl(p.name),
              })
            );
          }
        });
        this.file = {
          fileBase64: this.information.fileBase64,
          fileTypes: this.information.fileTypes,
          fileNames: this.information.fileNames,
        };
        this.showfilename = this.information.fileNames;
      },
      (er) => {
        this.toasterService.danger("Something went wrong!", "Error");
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
    this.file.fileNames = null;
    this.file.fileBase64 = null;
    this.file.fileTypes = null;
    this.showfilename = null;
  }
}
