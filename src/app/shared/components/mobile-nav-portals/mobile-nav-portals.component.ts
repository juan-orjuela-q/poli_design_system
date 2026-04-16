import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  OnDestroy,
  inject,
  WritableSignal
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { HeaderNavItemComponent } from '../header-nav-item/header-nav-item.component';
import { IconComponent } from '../icon/icon.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { BadgeComponent } from '../badge/badge.component';
import { RouteDefinition } from '@layout/interfaces/route-definition.interface';
import { filter, Subscription } from 'rxjs';
import { AuthService } from '@pages/auth/services/auth.service';
import { RightModalComponent } from '@shared/components/right-modal/right-modal.component';
import { TabsComponent } from '@shared/components/tabs/tabs.component';
import { ButtonComponent } from '@shared/components/button/button.component';

/** Estructura reutilizada para ítems de menú y links */
export interface NavLink {
  ruta: string;
  icon?: string;
  texto: string;
}

@Component({
  selector: 'app-mobile-nav-portals',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    HeaderNavItemComponent,
    IconComponent,
    AvatarComponent,
    BadgeComponent,
    RightModalComponent,
    TabsComponent,
    ButtonComponent
  ],
  templateUrl: './mobile-nav-portals.component.html',
  styleUrls: ['./mobile-nav-portals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavPortalsComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);
  private routerSubscription?: Subscription;

  // Signal para controlar la apertura del modal de usuario
  rightModalOpen: WritableSignal<boolean> = signal(false);

  // Pestañas y estado del modal
  modalTabs = [{ label: 'Mi cuenta' }];
  activeModalTabIndex = 0;

  // Datos de usuario para mostrar en el modal
  email: string | null = null;
  organizationalUnit: string | null = null;
  role: string | null = null;
  /** Logo del portal institucional */
  @Input({ required: true }) portalLogoSrc!: string;

  /** Nombre de usuario para el avatar */
  @Input() userName?: string;

  /** Icono del aplicativo (portal actual) */
  @Input() appIcon?: string;

  /** Nombre del aplicativo */
  @Input({ required: true }) appName!: string;

  /** Ruta del badge del aplicativo */
  @Input() appBadgeRoute: string = '/pages';

  /** Color/estado del badge del aplicativo */
  @Input() appBadgeStatus: 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark' = 'success';

  /** Badge padre (portal principal) - opcional */
  @Input() parentBadgeText?: string;
  @Input() parentBadgeIcon?: string;
  @Input() parentBadgeStatus?: 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark';
  @Input() parentBadgeRoute?: string;

  /** Ítems del menú principal */
  @Input({ required: true }) menuItems: RouteDefinition[] = [];

  /** Links complementarios (políticas, etc.) */
  @Input() footerLinks: NavLink[] = [];

  /** Controla si se muestra el botón de menú y el panel deslizante */
  @Input() showMenu = true;

  /** Controla si se muestra el avatar de usuario */
  @Input() showUserAvatar = true;

  /** Estado interno abierto/cerrado (signal para perf.) */
  readonly isOpen = signal(false);

  ngOnInit(): void {
    // Cerrar el menú automáticamente cuando se navega a una nueva ruta
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.close();
      });

    // Cargar datos de usuario
    const user = this.authService.getUser();
    const parsed = this.parseDN(user?.account?.idTokenClaims?.DN || '');
    this.email = user?.account?.username ?? null;
    this.organizationalUnit = parsed.unidad ?? null;
    this.role = parsed.rol ?? null;
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  toggle(): void {
    this.isOpen.update(v => !v);
  }

  close(): void {
    this.isOpen.set(false);
  }

  // Agregamos la clase `is-open` al host para facilitar estilos
  @HostBinding('class.is-open') get opened() {
    return this.isOpen();
  }

  onAvatarClick(): void {
    this.toggleRightModal();
  }

  openRightModal(): void {
    this.rightModalOpen.set(true);
  }

  closeRightModal(): void {
    this.rightModalOpen.set(false);
  }

  toggleRightModal(): void {
    this.rightModalOpen.update(v => !v);
  }

  onModalTabChange(index: number): void {
    this.activeModalTabIndex = index;
  }

  signOut(): void {
    this.authService.signOut();
  }

  private parseDN(dnString: string): { cn: string | null; rol: string | null; unidad: string | null; allOUs: string[]; fullDN: string } {
    const result = {
      cn: null as string | null,
      rol: null as string | null,
      unidad: null as string | null,
      allOUs: [] as string[],
      fullDN: dnString
    };

    if (!dnString || typeof dnString !== 'string') {
      return result;
    }

    const parts = dnString.split(',').map(part => part.trim());
    const ous: string[] = [];

    for (const part of parts) {
      if (part.toUpperCase().startsWith('CN=')) {
        result.cn = part.substring(3).trim();
      }
      if (part.toUpperCase().startsWith('OU=')) {
        const ouValue = part.substring(3).trim();
        ous.push(ouValue);
      }
    }

    result.allOUs = ous;
    result.rol = ous.length > 0 ? ous[0] : null;
    result.unidad = ous.length > 1 ? ous[1] : null;

    return result;
  }
}
