import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { APP_ROUTE } from './app.routes';
import { LanguageService } from '@core/services/language.service';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// MSAL deshabilitado para CPO - No requiere autenticación institucional
// import { MsalModule, MsalService, MsalBroadcastService, MsalInterceptor } from '@azure/msal-angular';
// import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
// import { msalInterceptorFn } from '@core/interceptor/msal.interceptor';
// import { errorInterceptorFn } from '@core/interceptor/error.interceptor';
// import { StartupService } from '@pages/auth/services/startup.service';

// Loader para traducciones
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    // Rutas y HTTP sin interceptores MSAL
    provideRouter(APP_ROUTE),
    provideHttpClient(), // Sin interceptores para CPO
    importProvidersFrom(LoadingBarModule),
    importProvidersFrom(LoadingBarHttpClientModule),
    
    // Animaciones
    provideAnimations(),
    provideAnimationsAsync(),

    // Traducción y lenguaje
    LanguageService,
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'es', // Por defecto el idioma español, Archivo =>  src\assets\i18n\es.json
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      })
    ),
  ],
};
