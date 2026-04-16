import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

/**
 * Componente modal deslizable desde la derecha.
 * Funciona como panel lateral para mostrar contenido adicional.
 */
@Component({
  selector: 'app-right-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './right-modal.component.html',
  styleUrl: './right-modal.component.scss'
})
export class RightModalComponent implements AfterContentInit {
  /** Controla la visibilidad del modal */
  @Input() visible: boolean = false;

  /** Título del modal */
  @Input() title: string = '';

  /** Texto del modal (alternativa a content projection) */
  @Input() text: string = '';

  /** Texto del botón primario */
  @Input() primaryButtonText: string = '';

  /** Texto del botón secundario */
  @Input() secondaryButtonText: string = '';

  /** Ancho del modal (por defecto 400px) */
  @Input() width: string = '400px';

  /** Permite cerrar al hacer clic en el backdrop */
  @Input() closeOnBackdrop: boolean = true;

  /** Evento emitido al cerrar el modal */
  @Output() close = new EventEmitter<void>();

  /** Evento emitido al hacer clic en el botón primario */
  @Output() primaryAction = new EventEmitter<void>();

  /** Evento emitido al hacer clic en el botón secundario */
  @Output() secondaryAction = new EventEmitter<void>();

  /** Referencia al contenido proyectado */
  @ContentChild(TemplateRef) content!: TemplateRef<any>;

  /** Indica si hay contenido proyectado */
  hasProjectedText: boolean = false;

  /**
   * Verifica si hay contenido proyectado después de la inicialización.
   */
  ngAfterContentInit(): void {
    this.hasProjectedText = !!this.content;
  }

  /**
   * Maneja el clic en el backdrop para cerrar el modal si está permitido.
   */
  onBackdropClick(): void {
    if (this.closeOnBackdrop) {
      this.onClose();
    }
  }

  /**
   * Cierra el modal emitiendo el evento correspondiente.
   */
  onClose(): void {
    this.close.emit();
  }

  /**
   * Ejecuta la acción primaria del modal.
   */
  onPrimary(): void {
    this.primaryAction.emit();
  }

  /**
   * Ejecuta la acción secundaria del modal.
   */
  onSecondary(): void {
    this.secondaryAction.emit();
  }
}
