import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

/**
 * Tipos disponibles para el componente Avatar.
 * - 'image': Muestra una imagen de usuario (requiere src).
 * - 'placeholder': Muestra un ícono por defecto.
 * - 'letter': Muestra una letra sobre fondo (requiere letter).
 */
export type AvatarType = 'image' | 'placeholder' | 'letter';

/**
 * Tamaños disponibles para el componente Avatar.
 * Corresponden a tamaños definidos en el sistema de diseño.
 */
export type AvatarSize = '2xl' | 'xl' | 'large' | 'medium' | 'small' | 'xs';

/**
 * Estados de usuario soportados por el Avatar.
 * - 'online': Verde
 * - 'away': Amarillo
 * - 'busy': Rojo
 * - null: Sin estado
 */
export type AvatarStatus = 'online' | 'away' | 'busy' | null; // verde, amarillo, rojo

/**
 * Componente Avatar
 * Permite mostrar la representación visual de un usuario con variantes de imagen,
 * placeholder o letra. Incluye opciones para mostrar notificaciones y estados.
 */
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  imports: [NgClass, NgIf, IconComponent],
})
export class AvatarComponent {
  /**
   * Tipo de avatar a mostrar.
   * - 'image': muestra una foto de usuario (requiere [src]).
   * - 'placeholder': ícono por defecto.
   * - 'letter': inicial del usuario (requiere [letter]).
   * @default 'placeholder'
   */
  @Input() type: AvatarType = 'placeholder';

  /**
   * Tamaño del avatar según el sistema de diseño.
   * @default 'medium'
   */
  @Input() size: AvatarSize = 'medium';

  /**
   * Muestra un indicador de notificación en la esquina superior derecha.
   * Puede ser:
   * - false: No se muestra.
   * - true: Se muestra el punto.
   * - number: Muestra el número (solo visible en tamaño 2xl).
   * @default false
   */
  @Input() notification: number | boolean = false;

  /**
   * Estado de usuario:
   * - 'online' (verde), 'away' (amarillo), 'busy' (rojo) o null.
   * Se muestra como un círculo en la parte inferior derecha del avatar.
   * @default null
   */
  @Input() status: AvatarStatus = null;

  /**
   * Ruta de la imagen del usuario.
   * Solo aplica cuando type es 'image'.
   */
  @Input() src?: string;

  /**
   * Letra o inicial a mostrar.
   * Solo aplica cuando type es 'letter'.
   */
  @Input() letter?: string;
}
