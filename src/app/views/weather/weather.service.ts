import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weather } from '@app/model/weather';
import { WeatherStore } from '@app/store/weather-store';
import { HttpService } from '@app/service/http.service';
import { TEMPERATURE_UNIT } from '@app/model/model.constants';

const NB_WEATHERS_MAX: number = 10;

const WEATHER_URI: string = environment.BASE_REST_URI;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private httpService: HttpService,
    private weatherStore: WeatherStore
  ) { }

  public getForecast(city: string, unit: TEMPERATURE_UNIT): Observable<Weather> {
    let httpParams = new HttpParams()
      .set('city', city.toLowerCase())
      .set('unit', String(unit));
    return this.httpService.get<Weather>(WEATHER_URI, httpParams);
  }

  public maximumNotYetReached(): boolean {
    return this.getWeathers().length < NB_WEATHERS_MAX;
  }

  public getWeathers(): Array<Weather> {
    return this.weatherStore.getWeathers();
  }

  public add(weather: Weather) {
    this.weatherStore.add(weather);
  }


  public alreadyExists(city: string): boolean {
    if (this.weatherStore.findWithName(city)) {
      return true;
    } else {
      return false;
    }
  }

}
