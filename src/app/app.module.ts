import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layouts/app-layout.module';
import { WeatherDialogComponent } from './views/weather/weather-dialog.component';
import { WeatherComponent } from './views/weather/weather.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    WeatherDialogComponent
  ],
  imports: [
    AppLayoutModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
