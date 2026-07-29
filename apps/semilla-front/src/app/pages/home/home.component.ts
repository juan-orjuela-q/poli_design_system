import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PdsAppHeaderComponent, PdsCardComponent } from '@poli/components';
import { APP, APP_SECTIONS, PORTAL } from '../../layout/portal-config';

/**
 * Portada del aplicativo.
 *
 * Banner con la identidad de la app y, debajo, la rejilla de acceso a sus
 * secciones. Ambos leen de `portal-config.ts`, así que añadir una sección ahí
 * la hace aparecer aquí sin tocar esta pantalla.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PdsAppHeaderComponent, PdsCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly app = APP;
  protected readonly portal = PORTAL;
  protected readonly sections = APP_SECTIONS;
}
