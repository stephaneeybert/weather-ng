import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { AppUiModule } from '@app/layouts/app-ui.module';
import { MaterialModule } from 'app/material.module';
import { AppRoutingModule } from 'app/app-routing.module';
import { I18nModule } from './i18n.module';
import { SidenavComponent } from './sidenav.component';
import { SimpleLayoutComponent } from './simple.layout.component';
import { ToastModule } from '@app/core/toast/toast.module';
import { BackgroundImagePipe } from '@app/pipe/background-image.pipe';
import { BackgroundColorPipe } from '@app/pipe/background-color.pipe';

@NgModule({
  declarations: [
    SimpleLayoutComponent,
    SidenavComponent,
    BackgroundImagePipe,
    BackgroundColorPipe
  ],
  imports: [
    I18nModule,
    AppRoutingModule,
    LayoutModule,
    AppUiModule,
    ToastModule,
    MaterialModule
  ],
  exports: [
    AppRoutingModule,
    LayoutModule,
    AppUiModule,
    ToastModule,
    MaterialModule,
    BackgroundImagePipe,
    BackgroundColorPipe
  ]
})
export class AppLayoutModule { }
