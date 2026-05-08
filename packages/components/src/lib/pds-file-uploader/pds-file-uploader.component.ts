import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { PdsButtonComponent } from '../pds-button/pds-button.component';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';
import { PdsFileUploaderItemComponent } from './pds-file-uploader-item/pds-file-uploader-item.component';
import { PdsFileItem } from './pds-file-uploader.types';

@Component({
  selector: 'pds-file-uploader',
  standalone: true,
  imports: [PdsButtonComponent, PdsIconComponent, PdsFileUploaderItemComponent],
  templateUrl: './pds-file-uploader.component.html',
  styleUrl: './pds-file-uploader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsFileUploaderComponent implements OnDestroy {
  private static _counter = 0;

  /** Etiqueta del campo (opcional). */
  readonly label = input<string | null>(null);

  /** Muestra asterisco de requerido. */
  readonly required = input<boolean>(false);

  /** Texto de ayuda debajo del área de carga. */
  readonly hint = input<string | null>(null);

  /** Texto instruccional dentro del área de carga. */
  readonly instructive = input<string>('Arrastra el archivo que deseas subir o');

  /** Tipos aceptados (MIME o extensiones). Ej: "image/*,.pdf". */
  readonly accept = input<string>('*');

  /** Permite múltiples archivos. */
  readonly multiple = input<boolean>(false);

  /** Tamaño máximo en bytes. null = sin límite. */
  readonly maxSize = input<number | null>(null);

  /** Deshabilita la zona de carga. */
  readonly disabled = input<boolean>(false);

  /** Variante de presentación. 'large' = drop zone visual. 'compact' = solo botón. */
  readonly type = input<'large' | 'compact'>('large');

  /**
   * Items en modo controlado.
   * Cuando se provee (≠ null), el componente refleja este array y no gestiona
   * su propio estado interno. Cuando es null, gestiona los items localmente.
   */
  readonly items = input<PdsFileItem[] | null>(null);

  /** Emite los nuevos PdsFileItem al añadir archivos. */
  readonly filesAdded = output<PdsFileItem[]>();

  /** Emite el id del item eliminado por el usuario. */
  readonly fileRemoved = output<string>();

  @ViewChild('fileInput') private readonly fileInput!: ElementRef<HTMLInputElement>;

  protected readonly isDragOver = signal(false);

  private readonly _internalItems = signal<PdsFileItem[]>([]);

  protected readonly inputId = `pds-file-uploader-${++PdsFileUploaderComponent._counter}`;

  constructor() {
    // Modo controlado: sincroniza items externos → estado interno
    effect(() => {
      const external = this.items();
      if (external !== null) {
        this._internalItems.set(external);
      }
    });
  }

  protected readonly displayItems = computed(() => this._internalItems());

  protected readonly showAddMore = computed(
    () => this.multiple() && this._internalItems().length > 0,
  );

  // ── Handlers zona de drop ─────────────────────────────────────────────────

  protected openFilePicker(event: Event): void {
    event.preventDefault();
    if (this.disabled()) return;
    this.fileInput.nativeElement.click();
  }

  protected onDragOver(event: DragEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.isDragOver.set(true);
  }

  protected onDragLeave(): void {
    this.isDragOver.set(false);
  }

  protected onDrop(event: DragEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.isDragOver.set(false);
    const files = Array.from(event.dataTransfer?.files ?? []);
    if (files.length) this.handleFiles(files);
  }

  protected onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    if (files.length) this.handleFiles(files);
    // Reset para permitir reseleccionar el mismo archivo
    input.value = '';
  }

  protected onItemRemoved(id: string): void {
    // Revocar object URL si la hay
    const item = this._internalItems().find((i) => i.id === id);
    if (item?.previewUrl) {
      URL.revokeObjectURL(item.previewUrl);
    }

    if (this.items() === null) {
      this._internalItems.update((items) => items.filter((i) => i.id !== id));
    }

    this.fileRemoved.emit(id);
  }

  // ── Procesamiento de archivos ─────────────────────────────────────────────

  private handleFiles(files: File[]): void {
    const maxSize = this.maxSize();
    const validFiles = maxSize ? files.filter((f) => f.size <= maxSize) : files;

    const newItems = (
      this.multiple() ? validFiles : validFiles.slice(0, 1)
    ).map((f) => this.createItem(f));

    if (!newItems.length) return;

    if (this.items() === null) {
      // Modo no controlado
      if (this.multiple()) {
        this._internalItems.update((current) => [...current, ...newItems]);
      } else {
        // Reemplaza archivo anterior: revocar URLs previas
        this._internalItems().forEach((i) => {
          if (i.previewUrl) URL.revokeObjectURL(i.previewUrl);
        });
        this._internalItems.set(newItems);
      }
    }

    this.filesAdded.emit(newItems);
  }

  private createItem(file: File): PdsFileItem {
    const item: PdsFileItem = {
      id: `pfu-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      file,
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'loading',
      errorMessage: null,
      previewUrl: null,
    };

    if (file.type.startsWith('image/')) {
      item.previewUrl = URL.createObjectURL(file);
    }

    return item;
  }

  ngOnDestroy(): void {
    // Limpiar todas las object URLs al destruir el componente
    this._internalItems().forEach((i) => {
      if (i.previewUrl) URL.revokeObjectURL(i.previewUrl);
    });
  }
}
