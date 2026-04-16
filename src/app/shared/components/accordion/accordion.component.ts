import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import {  NgIf } from '@angular/common';

/**
 * Componente Accordion – ítem desplegable con cabecera y panel de contenido.
 *
 * **Modo exclusivo**
 * Si varios acordeones comparten un mismo valor en la propiedad `group`, se comportarán como
 * un acordeón clásico (solo uno abierto al mismo tiempo).
 *
 * ```html
 * <app-accordion title="A" group="faq"></app-accordion>
 * <app-accordion title="B" group="faq"></app-accordion>
 * <app-accordion title="C" group="faq"></app-accordion>
 * ```
 */
@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [ NgIf],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {
  /** Título mostrado en la cabecera */
  @Input() title = '';
  /** Estado inicial abierto/cerrado */
  @Input() expanded = false;
  /** Deshabilita las interacciones */
  @Input() disabled = false;
  /** Identificador de grupo: acordeones con el mismo valor se excluyen entre sí */
  @Input() group?: string;

  /** Emite el nuevo valor de `expanded` cuando el usuario hace toggle */
  @Output() expandedChange = new EventEmitter<boolean>();

  /** Registro estático de los acordeones abiertos por grupo */
  private static groupOpen = new Map<string, AccordionComponent>();

  toggle(): void {
    if (this.disabled) return;

    const willExpand = !this.expanded;

    // Si se va a expandir y hay grupo, cerrar el que esté abierto.
    if (willExpand && this.group) {
      const currentlyOpen = AccordionComponent.groupOpen.get(this.group);
      if (currentlyOpen && currentlyOpen !== this) {
        currentlyOpen.closeSilently();
      }
      AccordionComponent.groupOpen.set(this.group, this);
    } else if (!willExpand && this.group) {
      // Si se va a colapsar y era el abierto, quitar del registro.
      const currentlyOpen = AccordionComponent.groupOpen.get(this.group);
      if (currentlyOpen === this) {
        AccordionComponent.groupOpen.delete(this.group);
      }
    }

    this.expanded = willExpand;
    this.expandedChange.emit(this.expanded);
  }

  /** Cierra sin emitir eventos externos (uso interno) */
  private closeSilently(): void {
    this.expanded = false;
    this.expandedChange.emit(false);
  }

  // Atajos de clase para poder estilizar con :host(.expanded|.disabled)
  @HostBinding('class.expanded') get isExpanded() { return this.expanded; }
  @HostBinding('class.disabled') get isDisabled() { return this.disabled; }
}