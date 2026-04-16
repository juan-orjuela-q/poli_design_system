import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
  signal
} from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { HeaderNavItemComponent } from '../header-nav-item/header-nav-item.component';
import { IconComponent } from '../icon/icon.component';
import { RouteDefinition } from '@layout/interfaces/route-definition.interface';

/** Estructura reutilizada para ítems de menú y links */
export interface NavLink {
  ruta: string;
  icon?: string;
  texto: string;
}

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, HeaderNavItemComponent, IconComponent],
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavComponent {
  /** Logo principal (para modo light usa `logoLightSrc`) */
  @Input({ required: true }) logoSrc!: string;
  @Input() logoLightSrc?: string;

  /** Ítems principales que se muestran a la derecha del logo */
  @Input() headerItems: RouteDefinition[] = [];

  /** Texto opcional dentro del panel */
  @Input() appTitle?: string;
  @Input() appSubtitle?: string;

  /** Ítems del menú principal */
  @Input({ required: true }) menuItems: RouteDefinition[] = [];

  /** Links complementarios (políticas, etc.) */
  @Input() footerLinks: NavLink[] = [];

  /** Estado interno abierto/cerrado (signal para perf.) */
  readonly isOpen = signal(false);

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
}
