/**
 * Interfaz que define la estructura de un elemento del timeline de historial
 * 
 * @interface TimelineItem
 */
export interface TimelineItem {
  /** Fecha del evento o hito */
  fecha: Date;
  
  /** Array de estados/eventos que ocurrieron en esta fecha */
  estados: string[];
  
  /** Nombre o email del revisor (opcional) */
  revisor?: string;
  
  /** Nombre del responsable de la acción (opcional) */
  responsable?: string;
  
  /** Observaciones o comentarios del evento (opcional) */
  observaciones?: string;
  
  /** Indica si es el elemento más reciente (icono resaltado) */
  esActivo: boolean;
}

/**
 * Opciones de configuración para el componente TimelineHistory
 */
export interface TimelineHistoryConfig {
  /** Permite exportar el historial */
  allowExport?: boolean;
  
  /** Formatos de exportación disponibles */
  exportFormats?: ExportFormat[];
  
  /** Altura máxima del contenedor del timeline */
  maxHeight?: string;
  
  /** Muestra el encabezado con opciones de exportación */
  showHeader?: boolean;
  
  /** Título personalizado para el timeline */
  title?: string;
  
  /** Permite personalizar los colores de los badges por estado */
  statusColorMap?: { [key: string]: string };
}

/**
 * Formatos de exportación disponibles
 */
export interface ExportFormat {
  /** Valor del formato (pdf, csv, xlsx) */
  value: string;
  
  /** Etiqueta mostrada al usuario */
  label: string;
}

/**
 * Estados posibles para los badges
 */
export type BadgeStatus = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';