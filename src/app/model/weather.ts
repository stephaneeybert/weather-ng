import { WeatherCurrent } from './weather-current';
import { WeatherLocation } from './weather-location';
import { WeatherRequest } from './weather-request';

export class Weather {

  request: WeatherRequest;
  location: WeatherLocation;
  current: WeatherCurrent;

  constructor(request: WeatherRequest, location: WeatherLocation, current: WeatherCurrent) {
    this.request = request;
    this.location = location;
    this.current = current;
  }

}
