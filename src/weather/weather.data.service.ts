import { environment } from './../environments/environment';
import { Forecasts } from './model/forecasts.model';
import { Locations } from './model/locations.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Currentconditions } from './model/currentWeather.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

//get currentcondition
@Injectable()
export class WeatherDataService extends DefaultDataService<Currentconditions> {
  constructor(http: HttpClient, httpurlGenerator: HttpUrlGenerator) {
    super('currentconditions', http, httpurlGenerator);
  }
  getById(locationKey: string): Observable<any> {
    const query = `currentconditions/v1/${locationKey}?apikey=${environment.apiKey}`;
    return this.http.get<any>(environment.baseUrl + query).pipe(
      map((data) => {
        const currntWeathers: Array<Currentconditions> = [];
        const currntWeather: Currentconditions = {
          id: locationKey,
          currentWeather: data,
        };
        currntWeathers.push(currntWeather);
        return currntWeathers;
      })
    );
  }
}
//get forecasts
@Injectable()
export class ForecastDataService extends DefaultDataService<Forecasts> {
  constructor(http: HttpClient, httpurlGenerator: HttpUrlGenerator) {
    super('forecasts', http, httpurlGenerator);
  }
  getById(locationKey: string): Observable<any> {
    const query = `forecasts/v1/daily/5day/${locationKey}?apikey=${environment.apiKey}`;
    return this.http.get<any>(environment.baseUrl + query).pipe(
      map((data) => {
        const forecasts: Array<any> = [];
        const forecast: Forecasts = {
          id: locationKey,
          forecastsWeather: data.DailyForecasts,
        };
        forecasts.push(forecast);
        return forecasts;
      })
    );
  }
}
//get location
@Injectable()
export class LocationDataService extends DefaultDataService<Locations> {
  constructor(http: HttpClient, httpurlGenerator: HttpUrlGenerator) {
    super('Locations', http, httpurlGenerator);
  }
  getById(city: string): Observable<any> {
    const query = `locations/v1/cities/autocomplete?apikey=${environment.apiKey}&q=${city}`;
    return this.http.get<any[]>(environment.baseUrl + query).pipe(
      map((data) => {
        const locations: Array<any> = [];
        const location: Locations = {
          id: data[0].Key,
          cityLocation: data[0],
        };
        locations.push(location);
        return locations;
      })
    );
  }
}
