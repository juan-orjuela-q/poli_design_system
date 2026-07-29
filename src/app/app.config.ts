import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

/**
 * Configuración mínima del host de Storybook.
 *
 * Esta app no se despliega: existe únicamente como `browserTarget` del builder
 * `@storybook/angular` (ver el proyecto `storybook-host` en `angular.json`), que
 * la usa para resolver tsconfig, estilos globales y providers al renderizar las
 * historias de `packages/components`.
 */
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideAnimations()],
};
