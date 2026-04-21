export interface PdsFileItem {
  /** Identificador único generado al añadir el archivo. */
  id: string;

  /** Referencia al objeto File original. */
  file: File;

  /** Nombre para mostrar. Por defecto `file.name`. */
  name: string;

  /** Tamaño en bytes. */
  size: number;

  /** Porcentaje de progreso (0–100). */
  progress: number;

  /** Estado actual de la carga. */
  status: 'loading' | 'success' | 'error';

  /** Mensaje de error cuando `status === 'error'`. */
  errorMessage?: string | null;

  /** URL para la miniatura (resultado de `URL.createObjectURL`). Solo imágenes. */
  previewUrl?: string | null;
}
