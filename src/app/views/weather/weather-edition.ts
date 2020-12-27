import { TEMPERATURE_UNIT } from '@app/model/model.constants';

export class WeatherEdition {

  city: string;
  unit: TEMPERATURE_UNIT;

  constructor(city: string, unit: TEMPERATURE_UNIT) {
    this.city = city;
    this.unit = unit;
  }

}
