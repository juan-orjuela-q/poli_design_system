import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';
import type { SidenavItem, SidenavSubItem } from '../pds-sidenav/pds-sidenav.component';

/** Variantes de branding del portal. */
export type PortalNavColor = 'blue' | 'yellow' | 'green' | 'magenta';

/** Identificador de cada nivel de la ruta. */
export type PortalNavLevelId = 'institutional' | 'portal' | 'app';

/** Nivel navegable de la barra (portal o aplicativo). */
export interface PortalNavLevel {
  /** Texto visible del nivel. */
  label: string;
  /**
   * Ruta interna del aplicativo. Preferir sobre `href` para navegación dentro
   * de la SPA: `href` provoca recarga completa de la página.
   */
  routerLink?: string | string[];
  /** URL absoluta o externa. Para rutas internas usar `routerLink`. */
  href?: string;
  /** Símbolo Material Symbols Rounded. Sólo se usa en el nivel portal. */
  icon?: string;
}

/** Contador para generar ids únicos de `aria-controls`. */
let portalNavUid = 0;

/**
 * **PdsPortalNav**
 *
 * Barra superior de navegación del ecosistema digital del Politécnico. Funciona
 * como un breadcrumb interactivo de tres niveles:
 * **Portal Institucional → Portal → Proceso/App**.
 *
 * Va por encima de todo el layout, incluido el sidenav.
 *
 * ### Comportamiento responsive
 *
 * En escritorio los tres niveles van en una sola barra. Por debajo de 768px la
 * barra se parte en dos filas —marca y acciones arriba, breadcrumb abajo— y
 * aparece el botón de menú, que despliega los ítems de `menuItems`.
 *
 * Ese menú recibe el mismo `SidenavItem[]` que consume `pds-sidenav`, de modo que
 * el aplicativo define su navegación una sola vez y la pasa a ambos componentes.
 *
 * ### Estados
 *
 * `hover`, `focus` y `pressed` se resuelven con pseudo-clases CSS — no son props.
 * El único estado que el consumidor controla es `current`, que marca la ubicación
 * actual del usuario y se traduce a `aria-current="page"`.
 *
 * @example
 * ```html
 * <pds-portal-nav
 *   [portal]="{ label: 'P. Colaborador', icon: 'hive', href: '/portal' }"
 *   [app]="{ label: 'Cuponera' }"
 *   [menuItems]="navItems"
 *   [activeItemId]="'home'"
 *   color="yellow"
 *   current="app"
 *   (itemClick)="navegar($event)">
 *   <pds-avatar-button portalNavActions name="Andrea Zamora" role="Administrador" letter="A" />
 * </pds-portal-nav>
 * ```
 */
@Component({
  selector: 'pds-portal-nav',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, PdsIconComponent],
  templateUrl: './pds-portal-nav.component.html',
  styleUrl: './pds-portal-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsPortalNavComponent {
  /** Nivel portal. `null` lo oculta junto con su separador. */
  readonly portal = input<PortalNavLevel | null>(null);

  /** Nivel aplicativo. `null` lo oculta junto con su separador. */
  readonly app = input<PortalNavLevel | null>(null);

  /** Variante de branding del portal. */
  readonly color = input<PortalNavColor>('blue');

  /** Nivel donde se encuentra el usuario. Recibe `aria-current="page"`. */
  readonly current = input<PortalNavLevelId | 'none'>('app');

  /** URL del nivel institucional (la marca Poli). Para rutas internas usar `institutionalRouterLink`. */
  readonly institutionalHref = input<string>('');

  /** Ruta interna del nivel institucional. Tiene prioridad sobre `institutionalHref`. */
  readonly institutionalRouterLink = input<string | string[] | null>(null);

  /** Nombre accesible del nivel institucional — la marca es una imagen. */
  readonly institutionalLabel = input<string>('Portal Institucional del Politécnico Grancolombiano');

  /** Nombre accesible de la barra completa. */
  readonly ariaLabel = input<string>('Navegación del portal');

  /**
   * Ítems del menú móvil. Es el mismo tipo que consume `pds-sidenav`, para que el
   * aplicativo declare su navegación una sola vez. Si va vacío, el botón de menú no se muestra.
   */
  readonly menuItems = input<SidenavItem[]>([]);

  /** ID del ítem activo del menú. */
  readonly activeItemId = input<string>('');

  /** ID del sub-ítem activo del menú. */
  readonly activeSubItemId = input<string>('');

  /** Etiqueta del botón de menú cerrado. */
  readonly menuLabel = input<string>('Menú');

  /** Etiqueta del botón de menú abierto. */
  readonly menuCloseLabel = input<string>('Cerrar');

  /** Emite el nivel activado por clic o teclado. */
  readonly levelSelected = output<PortalNavLevelId>();

  /** Emite el ID del ítem o sub-ítem del menú activado. Misma forma que `pds-sidenav`. */
  readonly itemClick = output<{ itemId: string; subItemId?: string }>();

  /** Emite el nuevo estado del menú móvil. */
  readonly menuOpenChange = output<boolean>();

  /** Estado del menú móvil. */
  protected readonly menuOpen = signal(false);

  /** ID del ítem padre desplegado en el acordeón del menú. */
  protected readonly expandedItemId = signal<string | null>(null);

  protected readonly menuId = `pds-portal-nav-menu-${portalNavUid++}`;

  protected readonly hostClasses = computed(
    () =>
      `pds-portal-nav pds-portal-nav--${this.color()}` +
      (this.menuOpen() ? ' pds-portal-nav--menu-open' : ''),
  );

  /** El botón de menú sólo tiene sentido si hay algo que mostrar. */
  protected readonly hasMenu = computed(() => this.menuItems().length > 0);

  /** `aria-current="page"` sólo en el nivel donde está el usuario. */
  protected ariaCurrentFor(level: PortalNavLevelId): 'page' | null {
    return this.current() === level ? 'page' : null;
  }

  protected onSelect(level: PortalNavLevelId, event: Event): void {
    // Sin destino el elemento es un <button>: no hay navegación que impedir.
    // Con routerLink o href dejamos que el enlace haga lo suyo además de emitir.
    if (!this.isNavigable(level)) {
      event.preventDefault();
    }
    this.levelSelected.emit(level);
  }

  protected toggleMenu(): void {
    const open = !this.menuOpen();
    this.menuOpen.set(open);
    if (!open) {
      this.expandedItemId.set(null);
    }
    this.menuOpenChange.emit(open);
  }

  protected toggleExpanded(item: SidenavItem): void {
    this.expandedItemId.update((id) => (id === item.id ? null : item.id));
  }

  protected onMenuItemClick(item: SidenavItem): void {
    // Un ítem con hijos actúa como acordeón; no navega ni cierra el menú.
    if (item.children?.length) {
      this.toggleExpanded(item);
      return;
    }
    this.itemClick.emit({ itemId: item.id });
    this.closeMenu();
  }

  protected onMenuSubItemClick(item: SidenavItem, subItem: SidenavSubItem): void {
    this.itemClick.emit({ itemId: item.id, subItemId: subItem.id });
    this.closeMenu();
  }

  /** Escape cierra el menú — requisito de navegación por teclado. */
  @HostListener('document:keydown.escape')
  protected closeMenu(): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    this.expandedItemId.set(null);
    this.menuOpenChange.emit(false);
  }

  /** ¿El nivel se renderiza como enlace (routerLink o href) o como botón? */
  private isNavigable(level: PortalNavLevelId): boolean {
    if (level === 'institutional') {
      return !!this.institutionalRouterLink() || !!this.institutionalHref();
    }
    const target = level === 'portal' ? this.portal() : this.app();
    return !!target?.routerLink || !!target?.href;
  }
}
