import { Forecasts } from './../../weather/model/forecasts.model';
import { Locations } from './../../weather/model/locations.model';
import { Injectable } from '@angular/core';
import { Currentconditions } from '../../weather/model/currentWeather.model';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class WeatherService extends EntityCollectionServiceBase<Currentconditions> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('currentconditions', serviceElementsFactory);
  }
}
@Injectable({
  providedIn: 'root',
})
export class LocationService extends EntityCollectionServiceBase<Locations> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('locations', serviceElementsFactory);
  }
}
@Injectable({
  providedIn: 'root',
})
export class ForecastService extends EntityCollectionServiceBase<Forecasts> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('forecasts', serviceElementsFactory);
  }
}
