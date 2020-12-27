import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WeatherEdition } from './weather-edition';
import { WeatherValidator } from './weather-validator';
import { TEMPERATURE_UNIT, WEATHER_TEMPERATURE_UNIT, WEATHER_TEMPERATURE_UNIT_DEFAULT } from '@app/model/model.constants';

const NAME_MAX_LENGTH: number = 15;

type TemperatureUnitType = {
  id: TEMPERATURE_UNIT,
  name: string
};

@Component({
  templateUrl: './weather-dialog.component.html'
})
export class WeatherDialogComponent implements OnInit {

  form!: FormGroup;
  weatherEdition: WeatherEdition;
  weatherTemperatureUnits: Array<TemperatureUnitType> = new Array();

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<WeatherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private weatherValidator: WeatherValidator
  ) {
    const inputWeatherEdition: WeatherEdition = data.weather;
    this.weatherEdition = new WeatherEdition(inputWeatherEdition.city, inputWeatherEdition.unit);
  }

  ngOnInit() {
    this.instantiateLists();

    this.form = this.formBuilder.group({
      city: new FormControl(this.weatherEdition ? this.weatherEdition.city : '', [ Validators.required, Validators.maxLength(NAME_MAX_LENGTH), this.weatherValidator.validateNamePattern(), this.weatherValidator.validateNameIsNotAlreadyUsed() ]),
      unit: new FormControl(this.weatherEdition ? this.weatherEdition.unit : ''),
    });

    // Select a default unit
    this.form.get('unit')!.setValue(WEATHER_TEMPERATURE_UNIT_DEFAULT);

    // Have the form fields error messages shown on keystroke
    this.form.markAllAsTouched();
  }

  private instantiateLists(): void {
    WEATHER_TEMPERATURE_UNIT.forEach((name: string, id: TEMPERATURE_UNIT) => {
      this.weatherTemperatureUnits.push({ 'id': id, 'name': name });
    });
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.form.controls[controlName].hasError(errorName);
  }

  save(formGroup: FormGroup) {
    this.dialogRef.close(formGroup.value);
  }

  close() {
    this.dialogRef.close();
  }

  compareItemsById(id1: string, id2: string): boolean {
    // Use a == instead of a === so as to ignore the type difference if any
    return id1 == id2;
  }

}
