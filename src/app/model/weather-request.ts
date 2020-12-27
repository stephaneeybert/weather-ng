export class WeatherRequest {

  type: string;
  query: string;
  language: string;
  unit: string;

  constructor(type: string, query: string, language: string, unit: string) {
    this.type = type;
    this.query = query;
    this.language = language;
    this.language = language;
    this.unit = unit;
  }

}