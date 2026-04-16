import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { RouteDefinition } from '@layout/interfaces/route-definition.interface';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BadgeComponent } from '../badge/badge.component';
export interface SidenavItem {
  icon: string;   // Nombre del icono (ej. "dashboard")
  label: string;  // Texto visible
  route: string;  // Ruta a navegar
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [NgIf,
    RouterLink,
    RouterLinkActive,
    IconComponent,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    BadgeComponent,
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  /** Icono para el badge del header */
  @Input() headerIcon = 'local_activity';

  /** Color/estado del badge (ej. 'primary', 'secondary', etc.) */
  @Input() headerBadgeStatus: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'primary';

  /** Texto principal (ej. "Rol de usuario") */
  @Input() title = '';

  /** Ítems del menú */
  @Input() items: RouteDefinition[] = [];

  /** Control de colapso */
  collapsed = false;
  @Input() collapsedMenu = false;

  openItems: Set<string> = new Set(); // Guarda los labels de los items abiertos

  constructor(private router: Router) {}

  toggle(): void {
    this.collapsed = !this.collapsed;
  }



  toggleMenu(itemLabel: string): void {
    if (this.openItems.has(itemLabel)) {
      this.openItems.delete(itemLabel);
    } else {
      this.openItems.add(itemLabel);
    }
  }

  isOpen(itemLabel: string): boolean {
    return this.openItems.has(itemLabel);
  }

  /**
   * Navegar al dashboard/portal principal
   */
  navigateToMain(): void {
    this.router.navigate(['/cpo/home']);
  }
}
