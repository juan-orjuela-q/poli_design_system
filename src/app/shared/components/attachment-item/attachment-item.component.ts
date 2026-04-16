import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export interface AttachmentData {
  fileName: string;
  fileSizeFormatted: string;
  blobUrl: string;
}

/**
 * **Attachment Item**
 *
 * Componente reutilizable para mostrar un archivo adjunto con información
 * del nombre, tamaño y botón de descarga.
 *
 * ### Buenas prácticas
 * - Usar para listar archivos adjuntos de forma consistente
 * - El evento `download` debe manejarse en el componente padre
 * - Asegurar que blobUrl sea válido antes de emitir descarga
 */
@Component({
  selector: 'app-attachment-item',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './attachment-item.component.html',
  styleUrls: ['./attachment-item.component.scss']
})
export class AttachmentItemComponent {
  /** Nombre del archivo */
  @Input() fileName: string = '';

  /** Tamaño del archivo formateado (ej: "233.71 KB") */
  @Input() fileSizeFormatted: string = '';

  /** URL del blob para descargar */
  @Input() blobUrl: string = '';

  /** Modo de visualización: 'download' (clickeable completo) o 'delete' (solo botón interactivo) */
  @Input() mode: 'download' | 'delete' = 'download';

  /** Emite cuando se hace clic en el botón de descarga (modo download) */
  @Output() download = new EventEmitter<{ blobUrl: string; fileName: string }>();

  /** Emite cuando se hace clic en el botón de eliminar (modo delete) */
  @Output() delete = new EventEmitter<void>();

  onDownloadClick(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.mode === 'download') {
      this.download.emit({
        blobUrl: this.blobUrl,
        fileName: this.fileName
      });
    }
  }

  onDeleteClick(event: Event): void {
    event.stopPropagation();
    this.delete.emit();
  }
}
