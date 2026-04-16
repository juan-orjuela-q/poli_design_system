import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

/**
 * **Tabs**
 *
 * Contenedor de pestañas que organiza contenido relacionado en secciones
 * mutualmente excluyentes.  Permite al usuario cambiar de vista sin recargar
 * la página mediante la propiedad `selectedIndex`.
 *
 * ### Buenas prácticas
 * - Mantener los títulos cortos (1–2 palabras) para evitar que se corten.
 * - No sobre-cargar con más de 6 pestañas; agrupa o usa menús "Más" si
 *   necesitas muchas secciones.
 * - Conservar el orden lógico de izquierda a derecha según la relevancia.
 * - Controlar la pestaña activa con `selectedIndex` para integrarlo a la
 *   lógica del componente padre (routing, formularios paso a paso, etc.).
 */
@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [MatTabsModule, CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  /** Arreglo de objetos con etiqueta. */
  @Input() tabs: { label: string }[] = [];

  /** Índice seleccionado (two-way binding con `[selectedIndex]`) */
  @Input() selectedIndex = 0;

  /** Emite cuando cambia el índice seleccionado */
  @Output() selectedIndexChange = new EventEmitter<number>();

  /**
   * Maneja el cambio de pestaña activa
   * @param index Nuevo índice seleccionado
   */
  onTabChange(index: number): void {
    this.selectedIndex = index;
    this.selectedIndexChange.emit(index);
  }
}
