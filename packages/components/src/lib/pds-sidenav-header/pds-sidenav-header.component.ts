import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';
import type { PortalNavColor } from '../pds-portal-nav/pds-portal-nav.component';

/** Branding del portal. Mismo eje que `pds-portal-nav` y `pds-portal-header`. */
export type SidenavHeaderColor = PortalNavColor;

/**
 * **PdsSidenavHeader**
 *
 * Encabezado del sidenav: ícono del portal, nombre del aplicativo y subtítulo.
 * Es un building block de `pds-sidenav` — rara vez se usa suelto.
 *
 * ### Interactividad
 *
 * Con `homeLink` la marca se convierte en un enlace al inicio del aplicativo y
 * gana los estados `hover` y `focus`. Sin `homeLink` es texto sin interacción,
 * y por tanto sin esos estados: un elemento que reacciona al puntero pero no
 * hace nada al pulsarlo es una promesa falsa.
 *
 * ### Colapsado
 *
 * `expanded = false` oculta el bloque de texto con una transición de ancho, sin
 * sacarlo del DOM, para que el colapso del sidenav se anime.
 *
 * @example
 * ```html
 * <pds-sidenav-header
 *   title="Mi Aplicación"
 *   subtitle="Politécnico Grancolombiano"
 *   iconName="hive"
 *   homeLink="/home"
 *   [expanded]="expanded()" />
 * ```
 */
@Component({
  selector: 'pds-sidenav-header',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, PdsIconComponent],
  templateUrl: './pds-sidenav-header.component.html',
  styleUrl: './pds-sidenav-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsSidenavHeaderComponent {
  /** Nombre del aplicativo. */
  readonly title = input<string>('App Title');

  /** Segunda línea, opcional. Suele ser la dependencia o la institución. */
  readonly subtitle = input<string>('');

  /** Ícono del portal (Material Symbols Rounded). */
  readonly iconName = input<string>('hive');

  /** Variante de branding del portal. */
  readonly color = input<SidenavHeaderColor>('blue');

  /** `false` colapsa el bloque de texto y deja sólo el ícono. */
  readonly expanded = input<boolean>(true);

  /**
   * Ruta del inicio del aplicativo. Si se define, la marca es un enlace; si se
   * omite, es texto sin interacción.
   */
  readonly homeLink = input<string | string[] | null>(null);

  protected readonly classes = computed(() => {
    const c = ['pds-sidenav-header', `pds-sidenav-header--${this.color()}`];
    if (!this.expanded()) c.push('pds-sidenav-header--collapsed');
    return c.join(' ');
  });
}
