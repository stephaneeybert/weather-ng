import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { WeatherValidatorService } from './weather-validator.service';

const REGEX_ALLOWED_CHARS: RegExp = /^[a-z0-9_-]+$/i;

@Injectable({
  providedIn: 'root',
})
export class WeatherValidator {

  constructor(
    private weatherValidatorService: WeatherValidatorService
  ) { }

  validateNamePattern(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!REGEX_ALLOWED_CHARS.test(control.value)) {
        return { invalidPattern: true };
      }
      return null;
    }
  }

  validateNameIsNotAlreadyUsed(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.weatherValidatorService.nameIsAlreadyUsed(control.value)) {
        return { nameIsAlreadyUsed: true };
      }
      return null;
    }
  }

}
