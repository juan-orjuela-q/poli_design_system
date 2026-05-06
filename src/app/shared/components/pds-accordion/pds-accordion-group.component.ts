import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PdsAccordionGroupService } from './pds-accordion-group.service';

/**
 * **PdsAccordionGroup**
 *
 * Contenedor opcional que aplica comportamiento exclusivo:
 * solo un `pds-accordion` hijo puede estar abierto al mismo tiempo.
 *
 * ```html
 * <pds-accordion-group>
 *   <pds-accordion title="Pregunta 1">Respuesta 1</pds-accordion>
 *   <pds-accordion title="Pregunta 2">Respuesta 2</pds-accordion>
 * </pds-accordion-group>
 * ```
 */
@Component({
  selector: 'pds-accordion-group',
  standalone: true,
  template: `<ng-content />`,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-component-sm, 8px);
      }
    `,
  ],
  providers: [PdsAccordionGroupService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsAccordionGroupComponent {}
