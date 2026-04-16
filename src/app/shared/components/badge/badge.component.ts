import { Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { IconComponent } from '../icon/icon.component';


export type BadgeType = 'pill' | 'dot' | 'rectangle';
export type BadgeSize = 'small' | 'medium' | 'large' | 'xl' | 'full';
export type BadgeStatus =
  | 'dark'
  | 'light'
  | 'warning'
  | 'danger'
  | 'success'
  | 'info'
  | 'pretermined';
export type HexColor = `#${string}`;

const HEX_COLOR_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/**
 * **Badge**
 *
 * Pequeña etiqueta/indicador que resalta un valor, estado o categoría.
 * Puede renderizarse como **pill**, **dot** o **rectangle** y admite una
 * paleta semántica (`status`) para expresar información de contexto
 * (éxito, advertencia, error, etc.).
 * Opcionalmente se le pueden añadir iconos antes y/o después del texto.
 *
 * ### Buenas prácticas
 * - Utilizar **`status`** para reflejar el significado semántico del color.
 * - Emplear **`type="dot"`** cuando solo se requiera indicar presencia/estado.
 * - Usar **`type="pill"`** o **`type="rectangle"`** para textos o contadores.
 * - Mantener **`size`** coherente con el componente que acompaña.
 */

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [NgClass, NgIf, IconComponent],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
  /** Texto del badge */
  @Input() text: string = '';
  /** Tipo visual del badge. Opciones: 'pill' | 'dot' | 'rectangle'. */
  @Input() type: BadgeType = 'pill';

  /** Tamaño del badge. Opciones: 'small' | 'medium' | 'large' | 'xl'. */
  @Input() size: BadgeSize = 'medium';

  /** Color semántico que comunica el estado o un código hexadecimal personalizado (por ejemplo, '#FFAA00'). */
  @Input() status: BadgeStatus | HexColor = 'dark';

  /** Nombre del icono opcional mostrado al inicio. */
  @Input() iconStart?: string;

  /** Nombre del icono opcional mostrado al final. */
  @Input() iconEnd?: string;


  get badgeClasses(): string[] {
    const classes: string[] = [this.type, this.size];
    const status = this.statusClass;
    if (status) {
      classes.push(status);
    }
    return classes;
  }

  get statusClass(): BadgeStatus | null {
    return this.isCustomHexColor() ? null : (this.status as BadgeStatus);
  }

  get customBackgroundColor(): string | null {
    if (!this.isCustomHexColor()) {
      return null;
    }

    const normalized = this.normalizeHexColor(this.status as string);
    return normalized ?? null;
  }

  get customTextColor(): string | null {
    const background = this.customBackgroundColor;
    if (!background) {
      return null;
    }

    return this.getContrastingColor(background);
  }

  /** Obtiene el tamaño apropiado del icono según el tamaño del badge */
  getIconSize(): string {
    switch (this.size) {
      case 'small':
        return '12px';
      case 'medium':
        return '14px';
      case 'large':
      case 'xl':
        return '16px';
      default:
        return '14px';
    }
  }

  private isCustomHexColor(): boolean {
    return typeof this.status === 'string' && HEX_COLOR_PATTERN.test(this.status);
  }

  private normalizeHexColor(color: string): string | undefined {
    const trimmed = color.trim();
    if (!HEX_COLOR_PATTERN.test(trimmed)) {
      return undefined;
    }

    if (trimmed.length === 4) {
      const r = trimmed[1];
      const g = trimmed[2];
      const b = trimmed[3];
      return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
    }

    return trimmed.substring(0, 7).toUpperCase();
  }

  private getContrastingColor(color: string): string {
    const { r, g, b } = this.hexToRgb(color);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness >= 128 ? '#000000' : '#FFFFFF';
  }

  private hexToRgb(color: string): { r: number; g: number; b: number } {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
  }
}
