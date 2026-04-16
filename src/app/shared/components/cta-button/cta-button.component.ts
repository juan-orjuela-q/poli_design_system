import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

/**
 * **CTA Button**
 *
 * Botón principal de llamada a la acción (Call-to-Action) del sistema de diseño
 * del Politécnico Grancolombiano.  Destaca la acción más relevante de la vista
 * combinando un texto breve y el icono “arrow_forward”.
 *
 * ### Buenas prácticas
 * - Mostrar **un solo CTA principal** por pantalla para evitar confusión.  
 * - Mantener el texto claro y breve (máx. 3 palabras).  
 * - Reservar este componente para acciones clave de negocio o navegación
 *   primaria; usar botones secundarios para el resto.  
 * - Escuchar el evento **`accion`** para ejecutar la lógica asociada.
 */
@Component({
  selector: 'app-cta-button',
  templateUrl: './cta-button.component.html',
  styleUrls: ['./cta-button.component.scss'],
  standalone: true,
  imports: [IconComponent],
})
export class CtaButtonComponent {
  /** Texto que se muestra dentro del botón. */
  @Input() texto: string = 'CTA - Enlace';

  /** Evento emitido al hacer clic en el CTA. */
  @Output() accion = new EventEmitter<void>();

  /** Interno: dispara el output `accion`. */
  onClick() {
    this.accion.emit();
  }
}