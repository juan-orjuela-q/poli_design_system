import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalBroadcastService,
  MsalGuard,
  MsalInterceptor,
  MsalModule,
  MsalService,
} from '@azure/msal-angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { APP_ROUTES } from './app.routes';
import {
  msalGuardConfig,
  msalInstanceFactory,
  msalInterceptorConfig,
} from './core/auth/msal.config';
import { StartupService } from './core/auth/startup.service';
import { msalInterceptorFn } from './core/interceptor/msal.interceptor';
import { errorInterceptorFn } from './core/interceptor/error.interceptor';
import { AppTitleStrategy } from './core/title.strategy';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// ── Inicializadores ────────────────────────────────────────────────────────────
// Fase 1: inicializa MSAL antes de cualquier otra cosa.
export function msalInitializerFactory(msalService: MsalService): () => Promise<void> {
  return () => firstValueFrom(msalService.initialize());
}

// Fase 2: completa el redirect, establece cuenta activa y renueva token.
export function startupInitializerFactory(startupService: StartupService): () => Promise<void> {
  return () => startupService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),

    // Interceptores funcionales en orden: MSAL adjunta token, luego error maneja respuestas
    provideHttpClient(withInterceptors([msalInterceptorFn, errorInterceptorFn])),

    provideAnimationsAsync(),

    // ── MSAL ──────────────────────────────────────────────────────────────────
    {
      provide: MSAL_INSTANCE,
      useFactory: msalInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useValue: msalGuardConfig,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useValue: msalInterceptorConfig,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    MsalInterceptor,

    // ── Inicialización en dos fases ────────────────────────────────────────────
    // Fase 1: MSAL debe inicializarse primero (convierte Observable a Promise)
    {
      provide: APP_INITIALIZER,
      useFactory: msalInitializerFactory,
      deps: [MsalService],
      multi: true,
    },
    // Fase 2: una vez MSAL listo, completar redirect y validar sesión
    {
      provide: APP_INITIALIZER,
      useFactory: startupInitializerFactory,
      deps: [StartupService],
      multi: true,
    },

    // ── i18n ──────────────────────────────────────────────────────────────────
    // ── Título de documento ────────────────────────────────────────────────────
    { provide: TitleStrategy, useClass: AppTitleStrategy },

    importProvidersFrom(
      MsalModule,
      TranslateModule.forRoot({
        defaultLanguage: 'es',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      }),
    ),
  ],
};
