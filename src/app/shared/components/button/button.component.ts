import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

/**
 * **Button**
 *
 * Botón estándar del sistema de diseño del Politécnico Grancolombiano.
 * Permite ejecutar acciones principales, secundarias o de contexto y
 * admite variantes de estilo (`type`), tamaños (`size`) e iconos opcionales
 * al inicio y/o final del texto.
 *
 * ### Buenas prácticas
 * - Usa **`type="primary"`** como llamada a la acción principal en una vista.
 * - Emplea **`destructive` / `destructiveOutline`** solo para acciones
 *   irreversibles.
 * - Deshabilita (`disabled=true`) cuando la acción no esté disponible.
 * - Mantén **`size`** coherente con el componente contenedor y la jerarquía
 *   visual de la interfaz.
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass, NgIf, IconComponent],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  /** Variante visual del botón. */
  @Input() type:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'link'
    | 'destructive'
    | 'destructiveOutline'
    | 'success'
    | 'warning'
    | 'cat'
    | 'flat' = 'primary';

  /** Tamaño del botón. */
  @Input() size: 'large' | 'medium' | 'small' = 'medium';

  /** Nombre del icono mostrado al inicio. */
  @Input() iconStart?: string;

  /** Nombre del icono mostrado al final. */
  @Input() iconEnd?: string;

  /** Cuando es true, el botón se muestra inactivo y no dispara eventos. */
  @Input() disabled = false;

  /** Cuando es true, el botón se muestra como una insignia. */
  @Input() isBadge = false;

  @Output() onclick: EventEmitter<Event> = new EventEmitter<Event>();

  /** Obtiene el tamaño apropiado del icono según el tamaño del botón */
  getIconSize(): string {
    switch (this.size) {
      case 'small':
        return '16px';
      case 'medium':
        return '20px';
      case 'large':
        return '24px';
      default:
        return '20px';
    }
  }

  /** Clases utilitarias calculadas para aplicar estilos según inputs. */
  get classes(): string[] {
    return [
      'btn',
      `btn--${this.type}`,
      `btn--${this.size}`,
      this.iconStart ? 'btn--icon-start' : '',
      this.iconEnd ? 'btn--icon-end' : '',
    ].filter(Boolean);
  }

  onClick(event: Event): void {
    this.onclick?.emit(event);
  }

}
