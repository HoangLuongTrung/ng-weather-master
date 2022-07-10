import { Component } from '@angular/core';
import {WeatherService} from '../weather.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {
  countryCode: string;
  zipcode: string;
  forecast: any;

  constructor(public weatherService: WeatherService, route : ActivatedRoute) {
    route.params.subscribe(params => {
      this.zipcode = params['zipcode'];
      this.countryCode  = params['countryCode'];
      weatherService.getForecast(this.zipcode, this.countryCode)
        .subscribe(data => this.forecast = data);
    });
  }
}
