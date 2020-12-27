import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MaterialService } from '@app/core/material.service';
import { TEMPERATURE_UNIT, WEATHER_TEMPERATURE_UNIT_DEFAULT } from '@app/model/model.constants';
import { WeatherStore } from '@app/store/weather-store';
import { TranslateService } from '@ngx-translate/core';
import { Weather } from 'app/model/weather';
import { Observable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WeatherDialogComponent } from './weather-dialog.component';
import { WeatherEdition } from './weather-edition';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {

  city: string = '';
  unit: TEMPERATURE_UNIT = WEATHER_TEMPERATURE_UNIT_DEFAULT;

  dialogRef!: MatDialogRef<WeatherDialogComponent>;
  @Output()
  private dialogSubscription?: Subscription;

  weathers$!: Observable<Array<Weather>>;

  constructor(
    private matDialog: MatDialog,
    private materialService: MaterialService,
    private translateService: TranslateService,
    private weatherStore: WeatherStore,
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.weathers$ = this.weatherStore.getWeather$();
  }

  ngOnDestroy() {
    if (this.dialogSubscription != null) {
      this.dialogSubscription.unsubscribe();
    }
  }

  addWeather(): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = {
      weather: {}
    };

    this.dialogRef = this.matDialog.open<WeatherDialogComponent>(WeatherDialogComponent, dialogConfig);

    this.dialogSubscription = this.dialogRef
      .afterClosed()
      .subscribe((weatherEdition: WeatherEdition) => {
        if (weatherEdition) {
          if (this.weatherService.alreadyExists(weatherEdition.city)) {
            const message: string = this.translateService.instant('weathers.message.alreadyExists', { city: weatherEdition.city });
            this.materialService.showSnackBar(message);
          } else {
            this.weatherService.getForecast(weatherEdition.city, weatherEdition.unit)
              .pipe(
                catchError((error: Error) => {
                  const message: string = this.translateService.instant('weathers.message.noNetwork', error);
                  this.materialService.showSnackBar(message);
                  return new Observable<Weather>();
                })
              )
              .subscribe((weather: Weather) => {
                if (weather.request) {
                  if (this.weatherService.alreadyExists(weather.location.name)) {
                    const message: string = this.translateService.instant('weathers.message.alreadyExists', { city: weather.location.name });
                    this.materialService.showSnackBar(message);
                  } else {
                    this.weatherService.add(weather);
                    const message: string = this.translateService.instant('weathers.message.added', { city: weatherEdition.city });
                    this.materialService.showSnackBar(message);
                  }
                } else {
                  const message: string = this.translateService.instant('weathers.message.notFound', { city: weatherEdition.city });
                  this.materialService.showSnackBar(message);
                }
              });
          }
        }
      });
  }

  deleteWeather(weather: Weather): void {
    if (this.weatherStore.delete(weather)) {
      const message: string = this.translateService.instant('weathers.message.deleted', { city: weather.location.name });
      this.materialService.showSnackBar(message);
    } else {
      const message: string = this.translateService.instant('weathers.message.notFound', { city: weather.location.name });
      this.materialService.showSnackBar(message);
    }
  }

}
