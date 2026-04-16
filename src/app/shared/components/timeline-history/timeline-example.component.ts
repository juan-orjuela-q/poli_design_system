import { Component } from '@angular/core';
import { TimelineHistoryComponent, TimelineItem, TimelineHistoryConfig, TimelineExportService } from '@shared/components/timeline-history';

/**
 * Componente de ejemplo que demuestra el uso del TimelineHistoryComponent
 */
@Component({
  selector: 'app-timeline-example',
  standalone: true,
  imports: [TimelineHistoryComponent],
  template: `
    <div class="example-container">
      <h2>Ejemplo de Timeline History</h2>
      
      <div class="example-section">
        <h3>Historial de Solicitud #12345</h3>
        <app-timeline-history
          [items]="exampleItems"
          [config]="exampleConfig"
          (exportRequested)="onExport($event)">
        </app-timeline-history>
      </div>

      <div class="example-section">
        <h3>Timeline Personalizado</h3>
        <app-timeline-history
          [items]="customItems"
          [config]="customConfig"
          (exportRequested)="onExport($event)">
        </app-timeline-history>
      </div>

      <div class="example-section">
        <h3>Timeline Sin Exportación</h3>
        <app-timeline-history
          [items]="simpleItems"
          [config]="simpleConfig">
        </app-timeline-history>
      </div>
    </div>
  `,
  styles: [`
    .example-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .example-section {
      margin-bottom: 40px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
    }

    h2 {
      color: #1f2937;
      border-bottom: 2px solid #3b82f6;
      padding-bottom: 10px;
    }

    h3 {
      color: #374151;
      margin-top: 0;
      margin-bottom: 20px;
    }
  `]
})
export class TimelineExampleComponent {

  constructor(private exportService: TimelineExportService) {}

  // Ejemplo 1: Timeline completo con todas las funcionalidades
  exampleItems: TimelineItem[] = [
    {
      fecha: new Date('2024-10-24T15:30:00'),
      estados: ['APROBADA'],
      revisor: 'Dr. Ana María López',
      responsable: 'Sistema Automático',
      observaciones: 'Solicitud aprobada después de revisión completa. Todos los documentos están en orden y cumplen con los requisitos establecidos.',
      esActivo: true
    },
    {
      fecha: new Date('2024-10-23T11:15:00'),
      estados: ['EN REVISION'],
      revisor: 'Dr. Ana María López',
      responsable: 'Coordinación Académica',
      observaciones: 'Solicitud asignada para revisión. Se verificarán los documentos adjuntos.',
      esActivo: false
    },
    {
      fecha: new Date('2024-10-22T09:45:00'),
      estados: ['RECIBIDA', 'VALIDACION INICIAL'],
      responsable: 'Sistema de Gestión',
      observaciones: 'Solicitud recibida y validada automáticamente. Documentos completos.',
      esActivo: false
    },
    {
      fecha: new Date('2024-10-22T09:00:00'),
      estados: ['CREADA'],
      responsable: 'Juan Carlos Pérez',
      observaciones: 'Solicitud creada por el estudiante. Documentos adjuntados correctamente.',
      esActivo: false
    }
  ];

  exampleConfig: TimelineHistoryConfig = {
    allowExport: true,
    showHeader: true,
    title: 'Historial Completo',
    maxHeight: '400px',
    exportFormats: [
      { value: 'pdf', label: 'Exportar PDF' },
      { value: 'csv', label: 'Exportar CSV' },
      { value: 'xlsx', label: 'Exportar Excel' }
    ]
  };

  // Ejemplo 2: Timeline personalizado con colores específicos
  customItems: TimelineItem[] = [
    {
      fecha: new Date('2024-10-24T14:20:00'),
      estados: ['COMPLETADO'],
      responsable: 'María García',
      observaciones: 'Proceso completado exitosamente.',
      esActivo: true
    },
    {
      fecha: new Date('2024-10-24T10:10:00'),
      estados: ['PROCESANDO'],
      responsable: 'Sistema',
      observaciones: 'Procesando información...',
      esActivo: false
    },
    {
      fecha: new Date('2024-10-23T16:30:00'),
      estados: ['PENDIENTE'],
      responsable: 'Roberto Silva',
      observaciones: 'En espera de documentación adicional.',
      esActivo: false
    }
  ];

  customConfig: TimelineHistoryConfig = {
    allowExport: true,
    showHeader: true,
    title: 'Timeline Personalizado',
    maxHeight: '300px',
    statusColorMap: {
      'COMPLETADO': 'success',
      'PROCESANDO': 'info',
      'PENDIENTE': 'warning',
      'ERROR': 'danger'
    }
  };

  // Ejemplo 3: Timeline simple sin exportación
  simpleItems: TimelineItem[] = [
    {
      fecha: new Date('2024-10-24T12:00:00'),
      estados: ['ACTUALIZADO'],
      observaciones: 'Información actualizada correctamente.',
      esActivo: true
    },
    {
      fecha: new Date('2024-10-24T08:30:00'),
      estados: ['CREADO'],
      observaciones: 'Registro creado inicialmente.',
      esActivo: false
    }
  ];

  simpleConfig: TimelineHistoryConfig = {
    allowExport: false,
    showHeader: false,
    maxHeight: '200px'
  };

  /**
   * Maneja las solicitudes de exportación
   */
  onExport(format: string): void {
    console.log(`Exportando en formato: ${format}`);
    
    // Usar el servicio de exportación
    this.exportService.export(
      this.exampleItems, 
      format, 
      `timeline-history-example.${format}`
    );
  }
}