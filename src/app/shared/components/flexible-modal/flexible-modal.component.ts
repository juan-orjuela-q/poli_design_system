import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

export type ModalSize = 'small' | 'medium' | 'large' | 'extra-large' | 'full-width';

/**
 * **FlexibleModal**
 *
 * Modal altamente personalizable que permite mayor flexibilidad en el contenido y diseño.
 * Admite diferentes tamaños, contenido completamente proyectado y solo maneja la acción de cerrar.
 *
 * ### Características principales
 * - **Tamaños configurables**: small, medium, large, extra-large, full-width
 * - **Contenido libre**: Todo el contenido se proyecta vía `<ng-content>`
 * - **Solo botón cerrar**: Incluye únicamente la funcionalidad de cerrar
 * - **Diseño limpio**: Backdrop y container sin elementos predefinidos
 */
@Component({
  selector: 'app-flexible-modal',
  standalone: true,
  imports: [NgIf, NgClass, ButtonComponent],
  templateUrl: './flexible-modal.component.html',
  styleUrl: './flexible-modal.component.scss'
})
export class FlexibleModalComponent {
  @Input() title = '';

  /** Controla la visibilidad del modal. */
  @Input() visible = false;

  /** Tamaño del modal. */
  @Input() size: ModalSize = 'medium';

  /** Si permite cerrar haciendo clic en el backdrop. */
  @Input() closeOnBackdrop = true;

  /** Si muestra el botón de cerrar. */
  @Input() showCloseButton = true;

  /** Texto personalizado para el botón cerrar. */
  @Input() closeButtonText = 'Cerrar';

  /** Emitido al cerrar el modal. */
  @Output() closed = new EventEmitter<void>();

  /** Aplica clase CSS al host basada en el tamaño para posicionamiento del botón */
  @HostBinding('class')
  get hostClass(): string {
    return `modal-size-${this.size}`;
  }

  /**
   * Cierra el modal y emite evento.
   */
  close(): void {
    this.closed.emit();
  }

  /**
   * Maneja el click en el backdrop.
   */
  onBackdropClick(): void {
    if (this.closeOnBackdrop) {
      this.close();
    }
  }

  /**
   * Previene que el click en el container cierre el modal.
   */
  onContainerClick(event: Event): void {
    event.stopPropagation();
  }
}
