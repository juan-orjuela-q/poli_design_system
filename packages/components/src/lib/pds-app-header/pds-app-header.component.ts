import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';
import type { PortalNavColor } from '../pds-portal-nav/pds-portal-nav.component';

/** Branding del portal. Mismo eje que `pds-portal-nav` y `pds-portal-header`. */
export type AppHeaderColor = PortalNavColor;

/**
 * **PdsAppHeader**
 *
 * Banner de la portada de un aplicativo: ícono, nombre y descripción centrados
 * sobre un degradado azul.
 *
 * Es el equivalente de `pds-portal-header` un nivel más abajo. La diferencia no
 * es sólo visual: el encabezado de portal presenta el portal y ofrece acciones;
 * este presenta el aplicativo y no lleva acciones — debajo van las tarjetas de
 * sus secciones.
 *
 * ### Sobre el degradado
 *
 * Es siempre azul, independientemente del branding del portal. `color` sólo
 * afecta al ícono, que sí sigue al portal.
 *
 * @example
 * ```html
 * <pds-app-header
 *   title="PoliAccess"
 *   description="Gestión de acceso y credenciales institucionales."
 *   icon="hive"
 *   color="blue" />
 * ```
 */
@Component({
  selector: 'pds-app-header',
  standalone: true,
  imports: [PdsIconComponent],
  templateUrl: './pds-app-header.component.html',
  styleUrl: './pds-app-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsAppHeaderComponent {
  /** Nombre del aplicativo. Requerido. */
  readonly title = input.required<string>();

  /** Frase que explica para qué sirve el aplicativo. */
  readonly description = input<string | null>(null);

  /** Ícono identificador del aplicativo (Material Symbols Rounded). */
  readonly icon = input<string | null>(null);

  /** Variante de branding. Afecta al ícono, no al degradado. */
  readonly color = input<AppHeaderColor>('blue');

  /**
   * Nivel del encabezado. `1` en la portada del aplicativo (el caso normal);
   * `2` cuando la página ya tiene un `<h1>` propio.
   */
  readonly headingLevel = input<1 | 2>(1);

  protected readonly hostClasses = computed(
    () => `pds-app-header pds-app-header--${this.color()}`,
  );
}
