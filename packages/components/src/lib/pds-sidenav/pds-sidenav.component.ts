import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';

import { PdsIconComponent } from '../pds-icon/pds-icon.component';
import {
  PdsSidenavHeaderComponent,
  type SidenavHeaderColor,
} from '../pds-sidenav-header/pds-sidenav-header.component';

// ── Interfaces públicas ──────────────────────────────────────────────────────

export interface SidenavSubItem {
  /** Identificador único del sub-ítem. */
  id: string;
  /** Etiqueta visible. */
  label: string;
  /** Ruta Angular (routerLink) opcional. Si se omite, el componente emite `itemClick`. */
  routerLink?: string | string[];
}

export interface SidenavItem {
  /** Identificador único del ítem. */
  id: string;
  /** Etiqueta visible en estado expandido y en el tooltip cuando está colapsado. */
  label: string;
  /** Nombre del símbolo Material Symbols Rounded. */
  icon: string;
  /** Ruta Angular (routerLink) opcional. Requerida para items hoja. */
  routerLink?: string | string[];
  /** Sub-ítems de un nivel (padre). Si se define, el ítem actúa como acordeón. */
  children?: SidenavSubItem[];
}

// ── Componente ───────────────────────────────────────────────────────────────

/**
 * **PdsSidenav**
 *
 * Barra de navegación lateral del DS v2. Soporta estado expandido/colapsado,
 * ítems con sub-menú en un nivel, y tooltip automático en estado colapsado.
 *
 * ### Uso básico
 * ```html
 * <pds-sidenav
 *   [items]="navItems"
 *   appTitle="Mi Aplicación"
 *   appSubtitle="Portal Estudiantil"
 *   [expanded]="isOpen"
 *   (expandedChange)="isOpen = $event"
 *   (itemClick)="onNav($event)"
 * />
 * ```
 */
@Component({
  selector: 'pds-sidenav',
  standalone: true,
  imports: [NgClass, RouterLink, PdsIconComponent, PdsSidenavHeaderComponent],
  templateUrl: './pds-sidenav.component.html',
  styleUrl: './pds-sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsSidenavComponent {
  private readonly router = inject(Router);

  // ── Inputs ─────────────────────────────────────────────────────────────────

  /** Lista de ítems de navegación. Requerido. */
  readonly items = input.required<SidenavItem[]>();

  /** Título de la aplicación (visible en el encabezado al expandir). */
  readonly appTitle = input<string>('Mi Aplicación');

  /** Subtítulo / descripción del portal (visible en el encabezado al expandir). */
  readonly appSubtitle = input<string>('');

  /** Nombre del símbolo Material Symbols para el ícono del portal en el encabezado. */
  readonly appIconName = input<string>('hive');

  /**
   * Ruta del inicio del aplicativo. Si se define, la marca del encabezado
   * (ícono + título) se convierte en un enlace hacia ella; si se omite, la
   * marca queda como texto sin interacción.
   */
  readonly appHomeLink = input<string | string[] | null>(null);

  /** Variante de branding del portal. Debe coincidir con la de `pds-portal-nav`. */
  readonly portalColor = input<SidenavHeaderColor>('blue');

  /** Estado expandido/colapsado del sidenav. */
  readonly expanded = input<boolean>(true);

  /** ID del ítem activo (para marcar `aria-current`). */
  readonly activeItemId = input<string>('');

  /** ID del sub-ítem activo. */
  readonly activeSubItemId = input<string>('');

  /** Muestra la sección de pie de página (`ng-content[slot=footer]`). */
  readonly showFooter = input<boolean>(false);

  // ── Outputs ────────────────────────────────────────────────────────────────

  /** Emite el nuevo estado expandido/colapsado cuando el usuario activa el toggle. */
  readonly expandedChange = output<boolean>();

  /** Emite el ID del ítem o sub-ítem clickeado. */
  readonly itemClick = output<{ itemId: string; subItemId?: string }>();

  // ── Estado interno ─────────────────────────────────────────────────────────

  /** Set de IDs de ítems padre con sub-menú actualmente expandido. */
  protected readonly openItems = signal<Set<string>>(new Set());

  /** Verdadero mientras el cursor está sobre el sidenav y este estaba colapsado. */
  private readonly hoverExpanded = signal(false);

  /** Verdadero mientras un hijo del sidenav tiene el foco (navegación por teclado). */
  private readonly focusExpanded = signal(false);

  /** URL actual, actualizada en cada NavigationEnd. */
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  // ── Computed ───────────────────────────────────────────────────────────────

  /** Resuelve routerLink a string para comparar con la URL actual. */
  private routerLinkToString(link: string | string[] | undefined): string {
    if (!link) return '';
    return Array.isArray(link) ? link.join('/') : link;
  }

  /**
   * ID del ítem o sub-ítem activo resuelto desde la URL actual.
   * Usa el input `activeItemId` como fallback si ningún routerLink coincide.
   */
  private readonly resolvedActive = computed(() => {
    const url = this.currentUrl();
    for (const item of this.items()) {
      if (item.children?.length) {
        for (const sub of item.children) {
          const link = this.routerLinkToString(sub.routerLink);
          if (link && url.startsWith(link)) {
            return { itemId: item.id, subItemId: sub.id };
          }
        }
      } else {
        const link = this.routerLinkToString(item.routerLink);
        if (link && url.startsWith(link)) {
          return { itemId: item.id, subItemId: undefined };
        }
      }
    }
    // Fallback a inputs manuales
    return {
      itemId: this.activeItemId(),
      subItemId: this.activeSubItemId() || undefined,
    };
  });

  /** ID del ítem activo efectivo (ruta o input manual). */
  protected readonly effectiveActiveItemId = computed(
    () => this.resolvedActive().itemId
  );

  /** ID del sub-ítem activo efectivo (ruta o input manual). */
  protected readonly effectiveActiveSubItemId = computed(
    () => this.resolvedActive().subItemId ?? ''
  );

  /** Estado efectivo: expandido por input, por hover o por foco de teclado. */
  protected readonly isEffectivelyExpanded = computed(
    () => this.expanded() || this.hoverExpanded() || this.focusExpanded()
  );

  protected readonly navClasses = computed(() => ({
    'pds-sidenav': true,
    'pds-sidenav--collapsed': !this.isEffectivelyExpanded(),
  }));

  protected readonly toggleAriaLabel = computed(() =>
    this.expanded()
      ? 'Contraer menú de navegación'
      : 'Expandir menú de navegación'
  );

  protected readonly toggleIconName = computed(() =>
    this.isEffectivelyExpanded() ? 'left_panel_close' : 'left_panel_open'
  );

  // ── Métodos ────────────────────────────────────────────────────────────────

  /** Expande visualmente el sidenav al pasar el cursor (solo cuando está colapsado). */
  @HostListener('mouseenter')
  protected onMouseEnter(): void {
    if (!this.expanded()) {
      this.hoverExpanded.set(true);
    }
  }

  /** Vuelve al estado colapsado al sacar el cursor. */
  @HostListener('mouseleave')
  protected onMouseLeave(): void {
    this.hoverExpanded.set(false);
  }

  /** Expande el sidenav cuando un hijo recibe el foco (teclado). */
  @HostListener('focusin')
  protected onFocusIn(): void {
    if (!this.expanded()) {
      this.focusExpanded.set(true);
    }
  }

  /** Colapsa el sidenav cuando el foco sale completamente del componente. */
  @HostListener('focusout')
  protected onFocusOut(): void {
    this.focusExpanded.set(false);
  }

  /** Alterna el estado expandido/colapsado y emite el cambio. */
  protected toggleSidenav(): void {
    this.expandedChange.emit(!this.expanded());
  }

  /** Verifica si un ítem padre tiene su sub-menú abierto. */
  protected isItemOpen(itemId: string): boolean {
    return this.openItems().has(itemId);
  }

  /** Alterna la apertura del sub-menú de un ítem padre. */
  protected toggleItem(itemId: string): void {
    const current = new Set(this.openItems());
    if (current.has(itemId)) {
      current.delete(itemId);
    } else {
      current.add(itemId);
    }
    this.openItems.set(current);
  }

  /** Devuelve true si el ítem tiene hijos (actúa como padre de acordeón). */
  protected hasChildren(item: SidenavItem): boolean {
    return !!(item.children && item.children.length > 0);
  }

  /** Devuelve el nombre del ícono de flecha según el estado abierto/cerrado del padre. */
  protected chevronIcon(itemId: string): string {
    return this.isItemOpen(itemId) ? 'arrow_drop_up' : 'arrow_drop_down';
  }

  /** Maneja el click en un ítem de navegación. */
  protected onItemClick(item: SidenavItem): void {
    if (this.hasChildren(item)) {
      this.toggleItem(item.id);
    } else {
      this.itemClick.emit({ itemId: item.id });
    }
  }

  /** Maneja el click en un sub-ítem. */
  protected onSubItemClick(subItem: SidenavSubItem, parent: SidenavItem): void {
    this.itemClick.emit({ itemId: parent.id, subItemId: subItem.id });
  }

  /** Clases BEM para un ítem de navegación. */
  protected itemClasses(item: SidenavItem): Record<string, boolean> {
    const isActive = this.effectiveActiveItemId() === item.id;
    const isOpen = this.isItemOpen(item.id);
    // Auto-abrir el padre si uno de sus hijos está activo
    const hasActiveChild = !!(
      item.children?.some(
        (c) => c.id === this.effectiveActiveSubItemId()
      )
    );
    return {
      'pds-sidenav__item': true,
      'pds-sidenav__item--active': isActive && !this.hasChildren(item),
      'pds-sidenav__item--parent': this.hasChildren(item),
      'pds-sidenav__item--open': isOpen || hasActiveChild,
      'pds-sidenav__item--has-active-child': hasActiveChild,
    };
  }

  /** Clases BEM para un sub-ítem. */
  protected subItemClasses(subItem: SidenavSubItem): Record<string, boolean> {
    return {
      'pds-sidenav__subitem': true,
      'pds-sidenav__subitem--active':
        this.effectiveActiveSubItemId() === subItem.id,
    };
  }
}
