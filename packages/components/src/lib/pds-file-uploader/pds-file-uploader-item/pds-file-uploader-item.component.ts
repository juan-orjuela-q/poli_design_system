import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  computed,
  input,
  output,
} from '@angular/core';
import { PdsIconComponent } from '../../pds-icon/pds-icon.component';
import { PdsFileItem } from '../pds-file-uploader.types';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}b`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}kb`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}mb`;
}

@Component({
  selector: 'pds-file-uploader-item',
  standalone: true,
  imports: [PdsIconComponent],
  templateUrl: './pds-file-uploader-item.component.html',
  styleUrl: './pds-file-uploader-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsFileUploaderItemComponent {
  /** Datos del archivo a mostrar. */
  readonly item = input.required<PdsFileItem>();

  /** Emite el id cuando el usuario hace clic en el botón eliminar. */
  readonly removed = output<string>();

  @HostBinding('class')
  get hostClass(): string {
    return [
      'pds-file-uploader-item',
      `pds-file-uploader-item--${this.item().status}`,
    ].join(' ');
  }

  protected readonly formattedSize = computed(() =>
    formatBytes(this.item().size),
  );

  protected readonly statusText = computed(() => {
    switch (this.item().status) {
      case 'success':
        return 'Completo';
      case 'loading':
        return 'Cargando';
      case 'error':
        return 'Error';
    }
  });

  protected readonly progressLabel = computed(() => {
    const s = this.item().status;
    if (s === 'success') return '100%';
    if (s === 'loading') return `${this.item().progress}%`;
    return '';
  });

  protected readonly statusIcon = computed(() => {
    switch (this.item().status) {
      case 'success':
        return 'check_circle';
      case 'loading':
        return 'more_horiz';
      default:
        return null;
    }
  });

  /** Porcentaje real de fill (error y success = 100%). */
  protected readonly fillPercent = computed(() => {
    if (this.item().status === 'loading') return this.item().progress;
    return 100;
  });

  onRemove(): void {
    this.removed.emit(this.item().id);
  }
}
