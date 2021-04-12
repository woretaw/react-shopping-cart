import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ENTITY_METADATA_TOKEN, PLURAL_NAMES_TOKEN } from '@ngrx/data';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //  StoreModule.forFeature('currentconditions')
  ],
  providers: [
    {
      provide: ENTITY_METADATA_TOKEN,
      multi: true,
      useValue: {
        locations: {},
        currentconditions: {},
        forecasts: {},
      },
    },
    {
      provide: PLURAL_NAMES_TOKEN,
      multi: true,
      useValue: {
        locations: 'locations',
        currentconditions: 'currentconditions',
        forecasts: 'forecasts',
      },
    },
  ],
})
export class WeatherModule {}
