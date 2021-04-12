import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';

import {
  WeatherDataService,
  LocationDataService,
  ForecastDataService,
} from './../weather/weather.data.service';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule, EntityDataService } from '@ngrx/data';
import { entityConfig } from './entity-metadata';

import { AppRoutingModule } from './app-routing.module';
import { WeatherModule } from './../weather/weather.module';

import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather/weather.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { NavBarComponent } from './components/nav-bar//nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    FavoritesComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    WeatherModule,
  ],
  providers: [
    // {
    //   provide: DefaultDataServiceConfig,
    //   useValue: {
    //     root: 'http://dataservice.accuweather.com',
    //   },
    // },
    WeatherDataService,
    ForecastDataService,
    LocationDataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    entityDataService: EntityDataService,
    weatherDataService: WeatherDataService,
    locationDataService: LocationDataService,
    forecastDataService: ForecastDataService
  ) {
    entityDataService.registerService('locations', locationDataService);
    entityDataService.registerService('currentconditions', weatherDataService);
    entityDataService.registerService('forecasts', forecastDataService);
  }
}
