import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';

export type AlertType = 'light' | 'info' | 'danger' | 'success' | 'warning';
export type AlertSize = 'large' | 'medium' | 'small';

/**
 * **Alert**
 *
 * Componente de alerta del sistema de diseño del Politécnico Grancolombiano.
 * Muestra mensajes contextuales de información, éxito, advertencia o error.
 * Integra icono, título, descripción, botones de acción opcionales y control
 * para cerrar la alerta.  El color y el símbolo se ajustan automáticamente
 * según el tipo configurado.
 *
 * ### Buenas prácticas
 * - Utilizar `type` para comunicar el estado semántico del mensaje.
 * - Emplear los eventos `closed` para reaccionar en la lógica de la vista.
 */
@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass, NgIf, ButtonComponent, IconComponent],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  // ▶ TYPE — define esquema de color e icono
  /**
   * Tipo de alerta.
   * Valores admitidos: `'light' | 'info' | 'danger' | 'success' | 'warning'`
   */
  private _type: AlertType = 'light';
  @Input()
  set type(value: AlertType) {
    this._type = value;
    this.icon = this.iconByType[value] ?? '';
  }
  get type(): AlertType {
    return this._type;
  }

  // ▶ SIZE — controla diseño general (visibilidad de icono / título)
  /**
   * Tamaño de la alerta: `'large' | 'medium' | 'small'`
   */
  @Input() size: AlertSize = 'medium';

  // ▶ Control de cierre
  /** Indica si se muestra el botón de cerrar. Por defecto: `true` */
  @Input() closable = true;

  // ▶ Contenido textual
  /** Título opcional (se muestra en `medium` y `large`). */
  @Input() title = '';
  /** Descripción o cuerpo del mensaje. */
  @Input() description = '';

  // ▶ Botones (opcionales – solo `medium` y `large`)
  /** Texto del botón de acción primaria. */
  @Input() primaryLabel?: string;
  /** Texto del botón de acción secundaria. */
  @Input() secondaryLabel?: string;

  // ▶ Evento de cierre
  /** Se emite cuando el usuario cierra la alerta. */
  @Output() closed = new EventEmitter<void>();

  // ▶ Internos
  /** Icono actual resuelto a partir de `type`. */
  icon = '';
  private readonly iconByType: Record<AlertType, string> = {
    light: 'feedback',
    info: 'feedback',
    danger: 'dangerous',
    success: 'check_circle',
    warning: 'warning',
  } as const;

  // ▶ Flags computados para la plantilla
  get hasTitle(): boolean {
    return this.size !== 'small' && !!this.title;
  }
  get hasActions(): boolean {
    return (
      this.size !== 'small' &&
      (!!this.primaryLabel || !!this.secondaryLabel)
    );
  }

  onClose() {
    this.closed.emit();
  }
}
