import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgIf, NgFor, NgStyle } from '@angular/common';
import { BadgeComponent, BadgeStatus } from '../badge/badge.component';
import { MaterialSelectComponent, SelectOption } from '../select/select.component';
import { TimelineItem, TimelineHistoryConfig } from './timeline-item.interface';

/**
 * **TimelineHistoryComponent**
 *
 * Componente reutilizable para mostrar un historial de eventos en formato timeline.
 * Permite visualizar una serie de hitos con cambios de estado, fechas y observaciones.
 *
 * ### Características principales
 * - **Timeline visual**: Línea vertical con iconos que representan los eventos
 * - **Información completa**: Muestra estado, fecha, revisor, responsable y observaciones
 * - **Exportación opcional**: Permite exportar el historial en diferentes formatos
 * - **Altamente configurable**: Múltiples opciones de personalización
 * - **Responsive**: Se adapta a diferentes tamaños de pantalla
 * - **Standalone**: Puede ser usado independientemente en cualquier proyecto
 *
 * ### Ejemplo de uso
 * ```html
 * <app-timeline-history
 *   [items]="timelineItems"
 *   [config]="timelineConfig"
 *   (exportRequested)="onExportHistory($event)">
 * </app-timeline-history>
 * ```
 */
@Component({
  selector: 'app-timeline-history',
  standalone: true,
  imports: [NgIf, NgFor, NgStyle, BadgeComponent, MaterialSelectComponent],
  templateUrl: './timeline-history.component.html',
  styleUrl: './timeline-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineHistoryComponent implements OnInit {
  
  /** Array de elementos del timeline a mostrar */
  @Input() items: TimelineItem[] = [];
  
  /** Configuración opcional del componente */
  @Input() config: TimelineHistoryConfig = {};
  
  /** Emitido cuando se solicita exportar el historial */
  @Output() exportRequested = new EventEmitter<string>();

  /** Configuración por defecto */
  private readonly defaultConfig: TimelineHistoryConfig = {
    allowExport: true,
    exportFormats: [
      { value: 'pdf', label: 'PDF' },
      { value: 'csv', label: 'CSV' },
      { value: 'xlsx', label: 'XLSX' }
    ],
    maxHeight: '600px',
    showHeader: true,
    title: 'Historial',
    statusColorMap: {
      'EN REVISION': 'warning',
      'DEVUELTA': 'danger',
      'CAMBIO DE REVISOR': 'info',
      'APROBADA': 'success',
      'RECHAZADA': 'danger',
      'RECIBIDA': 'info',
      'ASIGNADA': 'light',
      'VALIDACION INICIAL': 'light',
      'CREADA': 'light',
      'APROBADO': 'success',
      'RECHAZADO': 'danger',
      'PENDIENTE': 'warning',
      'PROCESANDO': 'info',
      'COMPLETADO': 'success',
      'CANCELADO': 'dark'
    }
  };

  /** Configuración final combinada */
  finalConfig: TimelineHistoryConfig = {};

  /** Opciones para el select de exportación */
  exportOptions: SelectOption[] = [];

  ngOnInit(): void {
    // Combinar configuración por defecto con la proporcionada
    this.finalConfig = { ...this.defaultConfig, ...this.config };
    
    // Configurar opciones de exportación
    if (this.finalConfig.allowExport && this.finalConfig.exportFormats) {
      this.exportOptions = this.finalConfig.exportFormats.map(format => ({
        value: format.value,
        label: format.label
      }));
    }
  }

  /**
   * Obtiene los elementos del timeline ordenados por fecha descendente (más reciente primero)
   */
  get sortedItems(): TimelineItem[] {
    return [...this.items].sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
  }

  /**
   * Obtiene el color del badge para un estado específico
   */
  getStatusBadgeColor(estado: string): BadgeStatus {
    const statusMap = this.finalConfig.statusColorMap || this.defaultConfig.statusColorMap!;
    return (statusMap[estado.toUpperCase()] || 'light') as BadgeStatus;
  }

  /**
   * Formatea la fecha para mostrar en el timeline
   */
  formatDate(fecha: Date): string {
    if (!fecha || !(fecha instanceof Date)) {
      return 'Fecha inválida';
    }

    const day = fecha.getDate().toString().padStart(2, '0');
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const year = fecha.getFullYear();
    const hours = fecha.getHours().toString().padStart(2, '0');
    const minutes = fecha.getMinutes().toString().padStart(2, '0');
    const seconds = fecha.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  }

  /**
   * TrackBy function para optimizar el rendering del ngFor
   */
  trackByDate(index: number, item: TimelineItem): number {
    return item.fecha.getTime();
  }

  /**
   * Maneja la selección de formato de exportación
   */
  onExportSelected(format: string): void {
    if (format && this.finalConfig.allowExport) {
      this.exportRequested.emit(format);
    }
  }

  /**
   * Obtiene el estilo dinámico para la altura máxima del timeline
   */
  get timelineStyle(): { [key: string]: string } {
    return {
      'max-height': this.finalConfig.maxHeight || '600px'
    };
  }

  /**
   * Determina si se debe mostrar un campo específico
   */
  shouldShowField(value: string | undefined): boolean {
    return !!(value && value.trim() !== '');
  }
}