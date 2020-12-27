export class WeatherLocation {

  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
  observationTime: string;
  utcOffset: number;

  constructor(name: string, country: string, region: string, lat: number, lon: number, observationTime: string, utcOffset: number) {
    this.name = name;
    this.country = country;
    this.region = region;
    this.lat = lat;
    this.lon = lon;
    this.observationTime = observationTime;
    this.utcOffset = utcOffset;
  }

}