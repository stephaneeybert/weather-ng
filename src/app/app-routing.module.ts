import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SimpleLayoutComponent } from './layouts/simple.layout.component';
import { WeatherComponent } from './views/weather/weather.component';

const routes: Routes = [
  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      {
        path: 'weather',
        component: WeatherComponent
      },
      {
        path: '', // Note that a redirect prevents Lighthouse from auditing the PWA
        redirectTo: 'weather',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
    TranslateModule
  ]
})
export class AppRoutingModule { }
