import { Injectable } from '@angular/core';
import { WeatherStore } from '@app/store/weather-store';

@Injectable({
  providedIn: 'root',
})
export class WeatherValidatorService {

  constructor(
    private weatherStore: WeatherStore
  ) { }

  public nameIsAlreadyUsed(city: string): boolean {
    if (this.weatherStore.findWithName(city)) {
      return true;
    } else {
      return false;
    }
  }

}
