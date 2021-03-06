import { Component, OnDestroy, OnInit } from '@angular/core';
import { Country, CountryService } from 'app/country.service';
import { EMPTY, Subject } from 'rxjs';
import { LocationService } from "../location.service";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
  styleUrls: ['./zipcode-entry.component.css'],
})
export class ZipcodeEntryComponent implements OnInit, OnDestroy {
  zipcode = "";
  countryList: any[] = [];
  private countryCode = "";
  private destroyed$ = new Subject();
  constructor(private service: LocationService, private countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService
      .countryList$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res: Country[]) => {
        this.countryList = res;
      });
  }

  onChangeCountry(country: Country): void {
    this.countryCode = country?.alpha2Code || "";
  }

  addLocation$() {
    if (this.zipcode && this.countryCode) {
      return this.service.addLocation(this.zipcode, this.countryCode);
    }
    return EMPTY;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
