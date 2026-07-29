import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Shell vacío del host de Storybook. No se renderiza en ningún despliegue;
 * sólo satisface el `browserTarget` que necesita `@storybook/angular`.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
