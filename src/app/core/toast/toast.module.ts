import { NgModule, ModuleWithProviders } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ToastComponent } from './toast.component';
import { defaultToastConfig, TOAST_CONFIG_TOKEN } from './toast-config';
import { I18nModule } from '@app/layouts/i18n.module';

@NgModule({
  declarations: [
    ToastComponent
  ],
  imports: [
    OverlayModule,
    I18nModule
  ],
  exports: [
    I18nModule
  ]
})
export class ToastModule {

  public static forRoot(config = defaultToastConfig): ModuleWithProviders<ToastModule> {
    return {
      ngModule: ToastModule,
      providers: [
        {
          provide: TOAST_CONFIG_TOKEN,
          useValue: { ...defaultToastConfig, ...config },
        },
      ],
    };
  }
}
