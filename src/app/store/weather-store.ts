import { Injectable } from '@angular/core';
import { Store } from './store';
import { Observable } from 'rxjs';
import { Weather } from '@app/model/weather';
import { CommonService } from '@app/service/common.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherStore extends Store<Array<Weather>> {

  constructor(
    private commonService: CommonService
  ) {
    super(new Array<Weather>());
  }

  public getWeather$(): Observable<Array<Weather>> {
    return this.state$!;
  }

  public getWeathers(): Array<Weather> {
    return this.getState();
  }

  public add(weather: Weather) {
    const index: number = this.getWeatherIndex(weather.location.name);
    if (index === -1) {
      weather.location.name = this.commonService.normalizeName(weather.location.name);
      const weathers: Array<Weather> = this.getState();
      weathers.push(weather);
      this.setState(weathers);
    }
  }

  public delete(weather: Weather): boolean {
    const index: number = this.getWeatherIndex(weather.location.name);
    if (index !== -1) {
      const weathers: Array<Weather> = this.getState();
      weathers.splice(index, 1);
      this.setState(weathers);
      return true;
    } else {
      return false;
    }
  }

  public deleteAll(): boolean {
    let allDeleted: boolean = true;
    for (let weather of this.getWeathers()) {
      const deleted: boolean = this.delete(weather);
      if (!deleted) {
        allDeleted = false;
      }
    }
    return allDeleted;
  }

  private getWeatherIndex(weatherId: string): number {
    return this.getState().findIndex((weather: Weather) => {
      return this.commonService.normalizeName(weather.location.name) === this.commonService.normalizeName(weatherId);
    });
  }

  public findWithName(city: string): Weather | void {
    for (let weather of this.getWeathers()) {
      if (weather.location.name === city) {
        return weather;
      }
    }
  }

}
