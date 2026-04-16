import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/**
 * **Icon**
 *
 * Componente del sistema que renderiza los símbolos de  
 * **Material Symbols Rounded** para garantizar consistencia gráfica.  
 * Acepta el nombre del icono por medio de la propiedad `icon`.
 *
 * ### Buenas prácticas
 * - Utilizar únicamente nombres válidos de Material Symbols Rounded.  
 * - Combinar el icono con un `aria-label` o texto visible cuando el
 *   significado no sea evidente.  
 * - Evitar usarlo como elemento puramente decorativo si impacta la
 *   accesibilidad.  
 * - Controlar tamaño y color mediante clases utilitarias o estilos del tema,
 *   no directamente con atributos inline.
 */
@Component({
  selector: 'app-icon',
  imports: [MatIconModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  standalone: true,
})
export class IconComponent {
  /** Nombre del símbolo a mostrar (Material Symbols Rounded). */
  @Input() icon: string = 'home';
  @Input() size: string = '20px';
}