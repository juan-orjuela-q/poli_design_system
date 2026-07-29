import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';
import type { PortalNavColor } from '../pds-portal-nav/pds-portal-nav.component';

/**
 * Branding del portal. Comparte el tipo con `pds-portal-nav` a propósito: la
 * barra y el encabezado de un mismo portal no pueden quedar en colores
 * distintos, y con un solo tipo el compilador lo garantiza.
 */
export type PortalHeaderColor = PortalNavColor;

/**
 * **PdsPortalHeader**
 *
 * Encabezado de la portada de un portal: identifica dónde está el usuario y
 * ofrece las acciones transversales del portal (novedades, ayuda, lo que el
 * aplicativo decida).
 *
 * Va inmediatamente debajo de `pds-portal-nav` y por encima del contenido.
 * No sustituye al `<h1>` de las páginas internas de un aplicativo: es el
 * encabezado del portal, no el de cada vista.
 *
 * ### Uso
 * ```html
 * <pds-portal-header
 *   title="Gestión académica"
 *   description="Facilita y organiza la operación académica."
 *   icon="hive"
 *   color="blue">
 *   <pds-button portalHeaderActions variant="outline" size="sm" iconStart="campaign">
 *     Novedades
 *   </pds-button>
 * </pds-portal-header>
 * ```
 */
@Component({
  selector: 'pds-portal-header',
  standalone: true,
  imports: [PdsIconComponent],
  templateUrl: './pds-portal-header.component.html',
  styleUrl: './pds-portal-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsPortalHeaderComponent {
  /** Nombre del portal. Requerido. */
  readonly title = input.required<string>();

  /** Frase que explica para qué sirve el portal. */
  readonly description = input<string | null>(null);

  /** Ícono identificador del portal (Material Symbols Rounded). */
  readonly icon = input<string | null>(null);

  /** Variante de branding. Debe coincidir con la de `pds-portal-nav`. */
  readonly color = input<PortalHeaderColor>('blue');

  /**
   * Nivel del encabezado. `1` en la portada del portal (el caso normal); `2`
   * cuando la página ya tiene un `<h1>` propio, para no romper la jerarquía.
   */
  readonly headingLevel = input<1 | 2>(1);

  protected readonly hostClasses = computed(
    () => `pds-portal-header pds-portal-header--${this.color()}`,
  );
}
