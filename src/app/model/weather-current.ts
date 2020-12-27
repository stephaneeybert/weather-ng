export class WeatherCurrent {

  temperature: number;
  weatherCode: number;
  weatherIcons: Array<string>;
  windSpeed: number;
  windDegree: number;
  windDir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uvIndex: number;
  visibility: number;
  isDay: boolean;

  constructor(temperature: number, weatherCode: number, windSpeed: number, windDegree: number, windDir: string, pressure: number, precip: number, humidity: number, cloudcover: number, feelsLike: number, uvIndex: number, visibility: number, isDay: boolean) {
    this.temperature = temperature;
    this.weatherCode = weatherCode;
    this.weatherIcons = new Array();
    this.windSpeed = windSpeed;
    this.windDegree = windDegree;
    this.windDir = windDir;
    this.pressure = pressure;
    this.precip = precip;
    this.humidity = humidity;
    this.cloudcover = cloudcover;
    this.feelslike = feelsLike;
    this.uvIndex = uvIndex;
    this.visibility = visibility;
    this.isDay = isDay;
  }

  public addIcon(icon: string): void {
    this.weatherIcons.push(icon);
  }

}
