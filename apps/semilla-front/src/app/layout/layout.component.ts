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
  PdsSidenavComponent,
} from '@poli/components';
import { NAV_ITEMS } from './nav-config';
import { APP, PORTAL } from './portal-config';
import { UserProfileService } from '../core/services/user-profile.service';

/**
 * Shell del aplicativo: barra superior del ecosistema + sidenav + header.
 *
 * La barra va por encima de todo, incluido el sidenav, y muestra el breadcrumb
 * completo: Portal Institucional → portal → aplicativo. Por debajo de 768px el
 * sidenav se oculta y su navegación pasa al menú de la barra, para no ofrecer
 * dos menús a la vez.
 */
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    PdsSidenavComponent,
    PdsPortalNavComponent,
    PdsAvatarButtonComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  private readonly router = inject(Router);
  protected readonly userProfile = inject(UserProfileService);

  protected readonly navItems = NAV_ITEMS;
  protected readonly app = APP;
  protected readonly portal = PORTAL;
  protected readonly sidenavExpanded = signal(true);

  /** Nivel portal del breadcrumb: enlace real a la portada. */
  protected readonly portalLevel = {
    label: PORTAL.label,
    icon: PORTAL.icon,
    routerLink: PORTAL.routerLink,
  };

  /** Nivel app del breadcrumb. Es la ubicación actual. */
  protected readonly appLevel = { label: APP.label };

  /** En móvil el avatar se reduce a la inicial: el nombre no cabe junto al menú. */
  protected readonly compactAvatar = signal(false);

  constructor() {
    const mq = window.matchMedia('(max-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => this.compactAvatar.set(e.matches);

    this.compactAvatar.set(mq.matches);
    mq.addEventListener('change', onChange);
    inject(DestroyRef).onDestroy(() => mq.removeEventListener('change', onChange));
  }

  /** Navegación desde el menú móvil de la barra (los ítems del sidenav). */
  protected onMenuItemClick({
    itemId,
    subItemId,
  }: {
    itemId: string;
    subItemId?: string;
  }): void {
    const item = this.navItems.find((i) => i.id === itemId);
    const target = subItemId
      ? item?.children?.find((c) => c.id === subItemId)?.routerLink
      : item?.routerLink;

    if (target) void this.router.navigate([target]);
  }
}
