import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  PdsButtonComponent,
  PdsCardComponent,
  PdsModalComponent,
  PdsPortalHeaderComponent,
} from '@poli/components';
import { PORTAL, PORTAL_APPS } from '../../layout/portal-config';

/** Popups del encabezado. `null` = ninguno abierto. */
type PortalDialog = 'novedades' | 'ayuda' | null;

/**
 * Portada del portal.
 *
 * Estructura de referencia: encabezado del portal + tarjetas de acceso a los
 * aplicativos. Ambos leen de `portal-config.ts`, así que agregar un aplicativo
 * ahí lo hace aparecer aquí y en el menú móvil de la barra.
 */
@Component({
  selector: 'app-portal-home',
  standalone: true,
  imports: [
    PdsPortalHeaderComponent,
    PdsCardComponent,
    PdsButtonComponent,
    PdsModalComponent,
  ],
  templateUrl: './portal-home.component.html',
  styleUrl: './portal-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalHomeComponent {
  protected readonly portal = PORTAL;
  protected readonly apps = PORTAL_APPS;

  /**
   * Novedades y Ayuda abren popups. El diseño los deja a discreción de cada
   * portal: si tu proyecto no los necesita, borra los `pds-button` del slot
   * `[portalHeaderActions]` y el encabezado se ajusta solo.
   */
  protected readonly dialog = signal<PortalDialog>(null);

  protected openDialog(which: Exclude<PortalDialog, null>): void {
    this.dialog.set(which);
  }

  protected closeDialog(): void {
    this.dialog.set(null);
  }
}
