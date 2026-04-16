import { Component, Input, Output, EventEmitter, ContentChild, AfterContentInit, ElementRef } from '@angular/core';
import { NgIf } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

/**
 * **Modal**
 *
 * Diálogo flotante centrado que bloquea la interacción con el fondo
 * (`aria-modal="true"`).  Permite mostrar un título, un cuerpo de texto
 * (string o contenido proyectado vía `[modal-text]`) y botones de acción
 * primaria/secundaria.
 *
 * ### Buenas prácticas
 * - Mantener solo **un modal activo** a la vez para evitar confusión.
 * - Utilizar `title` descriptivo y mensajes concisos; proyectar contenido
 *   complejo con `<ng-content select="[modal-text]">`.
 * - Cerrar el modal en `onBackdropClick()` para una UX intuitiva.
 * - Escuchar los eventos **`primary`**, **`secondary`** y **`closed`**
 *   para manejar la lógica de tu página.
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterContentInit {
  /** Controla la visibilidad del modal. */
  @Input() visible = false;

  /** Título opcional que aparece en la parte superior. */
  @Input() title?: string;

  /** Texto plano del cuerpo cuando no se proyecta contenido. */
  @Input() text?: string;

  @Input() primaryButtonType:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'link'
    | 'destructive'
    | 'destructiveOutline'
    | 'success'
    | 'cat'
    | 'flat' = 'primary';

  /** Etiqueta del botón primario (obligatorio para mostrar footer). */
  @Input() primaryButtonText?: string;

  @Input() secondaryButtonType:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'link'
    | 'destructive'
    | 'destructiveOutline'
    | 'success'
    | 'cat'
    | 'flat' = 'outline';

  /** Etiqueta del botón secundario (opcional). */
  @Input() secondaryButtonText?: string;

  /** Emitido al pulsar el botón primario. */
  @Output() primary = new EventEmitter<void>();

  /** Emitido al pulsar el botón secundario. */
  @Output() secondary = new EventEmitter<void>();

  /** Emitido al pulsar “cerrar” o hacer clic en el backdrop. */
  @Output() closed = new EventEmitter<void>();

  /** Detecta si se ha proyectado texto vía `[modal-text]`. */
  @ContentChild('modalText') modalTextContent?: ElementRef;
  hasProjectedText = false;

  ngAfterContentInit(): void {
    this.hasProjectedText = !!this.modalTextContent;
  }

  /** Cierra el modal y emite evento. */
  close() { this.closed.emit(); }

  /** Click en backdrop ⇒ cerrar modal. */
  onBackdropClick() { this.close(); }

  /** Dispara evento primario. */
  onPrimary() { this.primary.emit(); }

  /** Dispara evento secundario. */
  onSecondary() { this.secondary.emit(); }
}
