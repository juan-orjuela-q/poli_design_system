import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  PdsAvatarButtonComponent,
  PdsPortalNavComponent,
} from '@poli/components';
import { UserProfileService } from '../../core/services/user-profile.service';
import { PORTAL, PORTAL_NAV_ITEMS } from '../portal-config';

/**
 * Shell de la portada de un portal.
 *
 * A diferencia de `LayoutComponent`, aquí **no hay sidenav**: el portal es el
 * nivel anterior a los aplicativos, y su navegación son las tarjetas de la
 * portada. En móvil esos mismos destinos se ofrecen en el menú de la barra.
 */
@Component({
  selector: 'app-portal-layout',
  standalone: true,
  imports: [RouterOutlet, PdsPortalNavComponent, PdsAvatarButtonComponent],
  templateUrl: './portal-layout.component.html',
  styleUrl: './portal-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalLayoutComponent {
  private readonly router = inject(Router);
  protected readonly userProfile = inject(UserProfileService);

  protected readonly portal = PORTAL;
  protected readonly navItems = PORTAL_NAV_ITEMS;

  /** Nivel de portal de la barra. Sin `href`: ya estamos en la portada. */
  protected readonly portalLevel = {
    label: PORTAL.label,
    icon: PORTAL.icon,
  };

  /**
   * En móvil el avatar se reduce a la inicial: en una barra de 375px el nombre
   * y el correo no caben junto al botón de menú.
   *
   * `pds-avatar-button` recibe `showName`/`showRole` como inputs estáticos, así
   * que el punto de corte se observa aquí en lugar de resolverse con CSS.
   */
  protected readonly compactAvatar = signal(false);

  constructor() {
    const mq = window.matchMedia('(max-width: 768px)');
    const sync = (matches: boolean) => this.compactAvatar.set(matches);

    sync(mq.matches);
    const onChange = (e: MediaQueryListEvent) => sync(e.matches);
    mq.addEventListener('change', onChange);
    inject(DestroyRef).onDestroy(() => mq.removeEventListener('change', onChange));
  }

  /** Navegación desde el menú móvil de la barra. */
  protected onMenuItemClick({ itemId }: { itemId: string }): void {
    const item = this.navItems.find((i) => i.id === itemId);
    if (item?.routerLink) {
      void this.router.navigate([item.routerLink]);
    }
  }
}
