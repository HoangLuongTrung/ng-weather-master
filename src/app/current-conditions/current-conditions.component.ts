import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from "../weather.service";
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { LocationService } from 'app/location.service';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit, OnDestroy {
  static timeReload = 30000;
  @Input() currentConditions = [];
  subscription: any;
  constructor(public weatherService: WeatherService, public locationService: LocationService, private router: Router) { }
  private destroyed$ = new Subject();

  ngOnInit(): void {
    // Call first time when init
    this.getCurrentConditions();
    // Set Interval recall API after every 30s
    this.subscription = setInterval(() => {
      this.reloadLocation();
    }, CurrentConditionsComponent.timeReload);
  }

  getCurrentConditions() {
    return this.weatherService.getCurrentConditions();
  }

  reloadLocation(): void {
    const locations = this.getCurrentConditions();
    locations.forEach((location) => {
      this.weatherService
        .getListCurrentConditions(location.zipcode, location.countryCode)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          location.data = data;
        });
    });
  }

  showForecast(zipcode: string, countryCode: string) {
    this.router.navigate(['/forecast', zipcode, countryCode])
  }

  removeLocation(zipcode: string): void {
    this.locationService.removeLocation(zipcode);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      clearInterval(this.subscription)
    }
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
