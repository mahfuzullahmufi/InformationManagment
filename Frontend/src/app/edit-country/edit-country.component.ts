import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../country/country.service';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.css'],
})
export class EditCountryComponent implements OnInit {
  updateCountry = new FormGroup({
    countryName: new FormControl(''),
  });

  constructor(
    private countryService: CountryService,
    private http: HttpClient,
    private r: ActivatedRoute
  ) {}

  message: boolean = false;

  ngOnInit(): void {
    //console.log(this.router.snapshot.params.id);
    this.r.paramMap.subscribe((parmas) => {
      const id = +parmas.get('id');
      this.countryService.getCountryById(id).subscribe((result) => {
        console.log(result);
        this.updateCountry = new FormGroup({
          countryName: new FormControl(result['countryName']),
        });
      });

      this.updateForm();
    });
  }

  updateForm() {
    this.r.paramMap.subscribe((parmas) => {
      const id = +parmas.get('id');
      this.countryService
        .updateCountry(id, this.updateCountry.value)
        .subscribe((result) => {
          console.log(result);
          this.message = true;
        });
    });
  }

  removeMessage() {
    this.message = false;
  }
}
