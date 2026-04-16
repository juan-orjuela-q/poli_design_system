import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';

/**
 * **Header Nav Item**
 *
 * Elemento de navegación que se coloca dentro del **Header**.  
 * Muestra un icono y un texto, ambos envueltos en un enlace (`routerLink`)
 * que dirige a la ruta configurada.
 *
 * ### Buenas prácticas
 * - Usa iconos claros y significativos para mejorar el reconocimiento visual.  
 * - Mantén el texto breve (1–2 palabras) para no saturar el header.  
 * - Destaca el ítem activo mediante estilos en la hoja SCSS.  
 * - Limita el número total de elementos de navegación para evitar
 *   sobrecargar la barra.
 */
@Component({
  selector: 'app-header-nav-item',
  templateUrl: './header-nav-item.component.html',
  styleUrls: ['./header-nav-item.component.scss'],
  standalone: true,
  imports: [IconComponent, RouterModule]
})
export class HeaderNavItemComponent {
  /** Nombre del icono a mostrar. */
  @Input() icon: string = 'home';   // Usar ng-content para mayor flexibilidad

  /** Texto que acompaña al icono. */
  @Input() texto: string = '';

  /** Ruta de destino del enlace. */
  @Input() ruta?: string = '';
  /** Rutas hijas */
  @Input() children?: any[];

  expanded = false; // <-- inicia cerrado

  toggle() {
    this.expanded = !this.expanded;
  }

}