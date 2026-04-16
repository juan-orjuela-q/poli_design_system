# TimelineHistory Component

Un componente Angular independiente y reutilizable para mostrar historiales de eventos en formato timeline. Perfecto para visualizar cambios de estado, fechas, observaciones y otros hitos en una línea de tiempo interactiva.

## 🚀 Características

- **📊 Timeline Visual**: Línea vertical con iconos que representan eventos históricos
- **🎨 Altamente Personalizable**: Configuración flexible de colores, formatos y comportamiento
- **📱 Responsive**: Se adapta automáticamente a diferentes tamaños de pantalla
- **📄 Exportación**: Soporte para exportar en PDF, CSV y XLSX
- **🔧 Standalone**: No requiere módulos adicionales, completamente independiente
- **⚡ Performance**: Optimizado con OnPush change detection y trackBy functions

## 📦 Instalación

1. Copia la carpeta `timeline-history` a tu proyecto:
```
src/app/shared/components/timeline-history/
```

2. Importa el componente donde lo necesites:
```typescript
import { TimelineHistoryComponent, TimelineItem, TimelineHistoryConfig } from '@shared/components/timeline-history';
```

## 🔧 Uso Básico

### Template
```html
<app-timeline-history
  [items]="timelineItems"
  [config]="timelineConfig"
  (exportRequested)="onExportHistory($event)">
</app-timeline-history>
```

### Component
```typescript
import { Component } from '@angular/core';
import { TimelineHistoryComponent, TimelineItem, TimelineHistoryConfig } from '@shared/components/timeline-history';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [TimelineHistoryComponent],
  template: `
    <app-timeline-history
      [items]="timelineItems"
      [config]="timelineConfig"
      (exportRequested)="onExport($event)">
    </app-timeline-history>
  `
})
export class ExampleComponent {
  timelineItems: TimelineItem[] = [
    {
      fecha: new Date('2023-10-20T10:30:00'),
      estados: ['APROBADA'],
      revisor: 'Juan Pérez',
      responsable: 'María García',
      observaciones: 'Solicitud aprobada sin observaciones',
      esActivo: true
    },
    {
      fecha: new Date('2023-10-19T14:15:00'),
      estados: ['EN REVISION'],
      revisor: 'Juan Pérez',
      observaciones: 'Revisión inicial de documentos',
      esActivo: false
    }
  ];

  timelineConfig: TimelineHistoryConfig = {
    allowExport: true,
    showHeader: true,
    title: 'Historial de Solicitud',
    maxHeight: '500px'
  };

  onExport(format: string) {
    console.log(`Exportando en formato: ${format}`);
    // Implementar lógica de exportación
  }
}
```

## 📋 Interfaces

### TimelineItem
```typescript
interface TimelineItem {
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
```

### TimelineHistoryConfig
```typescript
interface TimelineHistoryConfig {
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
  statusColorMap?: { [key: string]: BadgeStatus };
}
```

## 🎨 Personalización

### Colores de Estados
```typescript
const customConfig: TimelineHistoryConfig = {
  statusColorMap: {
    'APROBADA': 'success',
    'RECHAZADA': 'danger',
    'EN_REVISION': 'warning',
    'DEVUELTA': 'info',
    'PENDIENTE': 'secondary'
  }
};
```

### Formatos de Exportación
```typescript
const customConfig: TimelineHistoryConfig = {
  allowExport: true,
  exportFormats: [
    { value: 'pdf', label: 'Exportar PDF' },
    { value: 'excel', label: 'Exportar Excel' }
  ]
};
```

## 📱 Responsive Design

El componente es completamente responsive:

- **Desktop (> 1024px)**: Timeline completo con todos los detalles
- **Tablet (768px - 1024px)**: Ajustes de espaciado y tamaños
- **Mobile (< 768px)**: Layout optimizado para pantallas pequeñas
- **Small Mobile (< 480px)**: Diseño minimalista

## 🌓 Soporte para Tema Oscuro

El componente incluye soporte automático para tema oscuro usando CSS media queries:

```scss
@media (prefers-color-scheme: dark) {
  // Estilos para tema oscuro
}
```

## 🔄 Eventos

### exportRequested
Emitido cuando el usuario solicita exportar el historial:

```typescript
onExportRequested(format: string) {
  switch(format) {
    case 'pdf':
      this.exportToPDF();
      break;
    case 'csv':
      this.exportToCSV();
      break;
    // ... otros formatos
  }
}
```

## 🎯 Casos de Uso

### 1. Historial de Solicitudes
```typescript
// Solicitudes de homologación, préstamos, etc.
const solicitudItems: TimelineItem[] = [
  {
    fecha: new Date(),
    estados: ['RECIBIDA', 'ASIGNADA'],
    revisor: 'Ana López',
    observaciones: 'Solicitud recibida y asignada automáticamente',
    esActivo: true
  }
];
```

### 2. Proceso de Aprobación
```typescript
// Flujos de trabajo y aprobaciones
const procesoItems: TimelineItem[] = [
  {
    fecha: new Date(),
    estados: ['APROBACION_NIVEL_2'],
    responsable: 'Director Académico',
    observaciones: 'Aprobado por director académico',
    esActivo: true
  }
];
```

### 3. Seguimiento de Tickets
```typescript
// Sistema de tickets o incidencias
const ticketItems: TimelineItem[] = [
  {
    fecha: new Date(),
    estados: ['RESUELTO'],
    responsable: 'Soporte Técnico',
    observaciones: 'Ticket resuelto satisfactoriamente',
    esActivo: true
  }
];
```

## 🔧 Dependencias

El componente requiere los siguientes componentes del sistema de diseño:

- `BadgeComponent` - Para mostrar los estados
- `MaterialSelectComponent` - Para el selector de exportación

## 🚀 Roadmap

- [ ] Soporte para filtros por fecha
- [ ] Animaciones de entrada/salida
- [ ] Modo compacto vs expandido
- [ ] Integración con librerías de exportación (jsPDF, xlsx)
- [ ] Soporte para attachments/archivos
- [ ] Timeline horizontal (opcional)

## 📄 Licencia

Este componente es parte del sistema de gestión académica y está disponible para uso interno del proyecto.

## 🤝 Contribución

Para contribuir al componente:

1. Crea una rama feature desde `dev`
2. Implementa tus cambios
3. Asegúrate de que los tests pasen
4. Crea un Pull Request

## 📞 Soporte

Para soporte o preguntas sobre el componente, contacta al equipo de desarrollo.