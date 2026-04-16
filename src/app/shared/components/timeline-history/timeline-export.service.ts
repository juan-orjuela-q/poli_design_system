import { Injectable } from '@angular/core';
import { TimelineItem } from './timeline-item.interface';

/**
 * Servicio para manejar la exportación del historial del timeline
 */
@Injectable({
  providedIn: 'root'
})
export class TimelineExportService {

  /**
   * Exporta los items del timeline al formato especificado
   */
  export(items: TimelineItem[], format: string, filename?: string): void {
    const sortedItems = [...items].sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
    
    switch (format.toLowerCase()) {
      case 'csv':
        this.exportToCSV(sortedItems, filename);
        break;
      case 'pdf':
        this.exportToPDF(sortedItems, filename);
        break;
      case 'xlsx':
        this.exportToXLSX(sortedItems, filename);
        break;
      default:
        console.warn(`Formato de exportación no soportado: ${format}`);
    }
  }

  /**
   * Exporta a formato CSV
   */
  private exportToCSV(items: TimelineItem[], filename?: string): void {
    const headers = ['Fecha', 'Estados', 'Revisor', 'Responsable', 'Observaciones'];
    const csvContent = [
      headers.join(','),
      ...items.map(item => [
        `"${this.formatDateForExport(item.fecha)}"`,
        `"${item.estados.join('; ')}"`,
        `"${item.revisor || ''}"`,
        `"${item.responsable || ''}"`,
        `"${item.observaciones || ''}"`
      ].join(','))
    ].join('\n');

    this.downloadFile(csvContent, filename || 'timeline-history.csv', 'text/csv;charset=utf-8;');
  }

  /**
   * Exporta a formato PDF (requiere librerías adicionales como jsPDF)
   */
  private exportToPDF(items: TimelineItem[], filename?: string): void {
    // Implementación básica - requiere jsPDF para funcionalidad completa
    console.warn('Exportación a PDF requiere implementación específica con librerías como jsPDF');
    
    // Fallback: crear un HTML simple para imprimir
    const htmlContent = this.generateHTMLContent(items);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.print();
    }
  }

  /**
   * Exporta a formato XLSX (requiere librerías adicionales como xlsx)
   */
  private exportToXLSX(items: TimelineItem[], filename?: string): void {
    // Implementación básica - requiere SheetJS para funcionalidad completa
    console.warn('Exportación a XLSX requiere implementación específica con librerías como xlsx');
    
    // Fallback: exportar como CSV con extensión xlsx
    this.exportToCSV(items, filename?.replace('.xlsx', '.csv') || 'timeline-history.csv');
  }

  /**
   * Genera contenido HTML para impresión/PDF
   */
  private generateHTMLContent(items: TimelineItem[]): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Historial del Timeline</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .timeline-item { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
          .date { font-weight: bold; color: #E0006E; }
          .states { margin: 5px 0; }
          .state-badge { 
            display: inline-block; 
            background: #f0f0f0; 
            padding: 2px 8px; 
            border-radius: 4px; 
            margin-right: 5px; 
            font-size: 12px;
          }
          .field { margin: 3px 0; }
          .field-label { font-weight: bold; color: #007BA4; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>Historial del Timeline</h2>
          <p>Generado el ${new Date().toLocaleDateString()}</p>
        </div>
        ${items.map(item => `
          <div class="timeline-item">
            <div class="date">${this.formatDateForExport(item.fecha)}</div>
            <div class="states">
              ${item.estados.map(estado => `<span class="state-badge">${estado}</span>`).join('')}
            </div>
            ${item.revisor ? `<div class="field"><span class="field-label">Revisor:</span> ${item.revisor}</div>` : ''}
            ${item.responsable ? `<div class="field"><span class="field-label">Responsable:</span> ${item.responsable}</div>` : ''}
            ${item.observaciones ? `<div class="field"><span class="field-label">Observaciones:</span> ${item.observaciones}</div>` : ''}
          </div>
        `).join('')}
      </body>
      </html>
    `;
  }

  /**
   * Formatea la fecha para exportación
   */
  private formatDateForExport(fecha: Date): string {
    if (!fecha || !(fecha instanceof Date)) {
      return 'Fecha inválida';
    }

    const day = fecha.getDate().toString().padStart(2, '0');
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const year = fecha.getFullYear();
    const hours = fecha.getHours().toString().padStart(2, '0');
    const minutes = fecha.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  /**
   * Descarga un archivo con el contenido especificado
   */
  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}