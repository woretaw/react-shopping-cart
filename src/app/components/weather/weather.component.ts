import { map } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import {
  WeatherService,
  LocationService,
  ForecastService,
} from './../../services/weather.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  cityName: string;
  currentWeather: any;
  forecastsWeather: any;
  temp: any;
  data$: Observable<any>;
  currentCityName = 'tel aviv';
  cityKey: string;
  favorites = [];
  storeData: any;
  favId: string;
  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService,
    private forecastService: ForecastService,
    private store: Store,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}
  async ngOnInit() {
    // this.weatherService.entityActions$.subscribe((resp) => {
    //   data$ = resp.payload.data;
    //console.log('entity', data$);
    // });
    this.getCityData(this.currentCityName);
    this.currentWeather = JSON.parse(
      localStorage.getItem('curruntWeatherStore')
    );
    this.forecastsWeather = JSON.parse(
      localStorage.getItem('forcustWeatherStore')
    );

    await this.store
      .select((state) => state)
      .subscribe((data) => {
        this.storeData = data;
      });

    //get favorite data detail
    this.route.paramMap.subscribe((param) => {
      this.favId = param.get('id');
      if (this.favId) {
        this.getCurntWeatherData(this.favId);
        this.getFrcstWeatherData(this.favId);
      }
    });
  }

  onSubmit(form: NgForm) {
    this.getCityData(this.cityName);
    this.currentCityName = this.cityName;
  }
  //get city location
  getCityData(city: string) {
    this.locationService.getByKey(city).subscribe((resp) => {
      this.getCurntWeatherData(resp[0].id);
      this.getFrcstWeatherData(resp[0].id);
      this.cityKey = resp[0].id;
    });
  }
  //get currunt weather
  getCurntWeatherData(locationKey: string) {
    this.weatherService.getByKey(locationKey).subscribe(
      (resp) => {
        this.currentWeather = resp[0].currentWeather;
        localStorage.setItem(
          'curruntWeatherStore',
          JSON.stringify(this.currentWeather)
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //get 5 day forecast
  getFrcstWeatherData(locationKey: string) {
    this.forecastService.getByKey(locationKey).subscribe(
      (resp) => {
        this.forecastsWeather = resp[0].forecastsWeather;
        localStorage.setItem(
          'forcustWeatherStore',
          JSON.stringify(this.forecastsWeather)
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //add weather location to favorite
  saveOrRemoveTfav() {
    if (this.storeData.entityCache.hasOwnProperty('currentconditions')) {
      var lsFvorites = JSON.parse(localStorage.getItem('favorite'));
      var newFav = {
        id: this.storeData.entityCache.currentconditions.entities.undefined[0]
          .id,
        cityName: this.currentCityName,
        currentWeather: this.storeData.entityCache.currentconditions.entities
          .undefined[0].currentWeather,
      };
      if (lsFvorites == null) {
        var firstFav = [];
        firstFav.push(newFav);
        localStorage.setItem('favorite', JSON.stringify(firstFav));
        this.router.navigate(['/favorite']);
      } else {
        var isExist = false;
        var oldFav: any;
        for (var i = 0; i < lsFvorites.length; i++) {
          if (lsFvorites[i].cityName === newFav.cityName) {
            isExist = true;
            oldFav = lsFvorites[i];
            break;
          } else {
            isExist = false;
          }
        }
        if (isExist) {
          lsFvorites.pop(oldFav);
          localStorage.setItem('favorite', JSON.stringify(lsFvorites));
          this.toastr.info('location is removed');
        } else {
          lsFvorites.push(newFav);
          localStorage.setItem('favorite', JSON.stringify(lsFvorites));
          this.toastr.info('Location added to favorites');
          this.router.navigate(['/favorite']);
        }
      }
    } else {
      this.toastr.error('weather is not found', 'please try again');
    }
  }

  //claculate to celsuse func
  fahrenToCelsus(tem): Number {
    return Math.round((tem - 32) / 1.8);
  }
}
