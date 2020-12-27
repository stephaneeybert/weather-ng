import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const LANGUAGE_CODE_ENGLISH = 'en';
const LANGUAGE_CODE_FRANCAIS = 'fr';

export function httpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/');
}

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    TranslateModule
  ]
})
export class I18nModule {

  constructor(
    private translateService: TranslateService,
  ) {
    this.initLanguageTranslation();
  }

  private initLanguageTranslation(): void {
    this.translateService.addLangs([LANGUAGE_CODE_ENGLISH, LANGUAGE_CODE_FRANCAIS])
    const browserLanguage: string = this.translateService.getBrowserLang();
    console.log('The browser current language is: ' + browserLanguage);
    let selectedLanguage: string;
    if (this.translateService.getLangs().includes(browserLanguage)) {
      selectedLanguage = browserLanguage;
    } else {
      selectedLanguage = LANGUAGE_CODE_ENGLISH;
    }
    this.translateService.setDefaultLang(selectedLanguage);
    this.translateService.use(selectedLanguage);
    console.log('The language selected by the library is: ' + selectedLanguage);
  }

  public initEnglish(): void {
    this.translateService.setDefaultLang(LANGUAGE_CODE_ENGLISH);
    this.translateService.use(LANGUAGE_CODE_ENGLISH);
    console.log('The english language was selected explicitly');
  }

  public initFrench(): void {
    this.translateService.setDefaultLang(LANGUAGE_CODE_FRANCAIS);
    this.translateService.use(LANGUAGE_CODE_FRANCAIS);
    console.log('The french language was selected explicitly');
  }

}
