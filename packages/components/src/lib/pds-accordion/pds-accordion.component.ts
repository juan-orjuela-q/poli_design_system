import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { PdsAccordionGroupService } from './pds-accordion-group.service';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';

let _nextId = 0;

/**
 * **PdsAccordion**
 *
 * Ítem de acordeón desplegable del DS v2. Soporta uso autónomo o dentro de
 * `pds-accordion-group` (comportamiento exclusivo: solo uno abierto).
 *
 * ```html
 * <!-- Autónomo -->
 * <pds-accordion title="Título del panel">
 *   Contenido del panel
 * </pds-accordion>
 *
 * <!-- Exclusivo con group -->
 * <pds-accordion-group>
 *   <pds-accordion title="A">…</pds-accordion>
 *   <pds-accordion title="B">…</pds-accordion>
 * </pds-accordion-group>
 * ```
 */
@Component({
  selector: 'pds-accordion',
  standalone: true,
  imports: [PdsIconComponent],
  templateUrl: './pds-accordion.component.html',
  styleUrl: './pds-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsAccordionComponent {
  private readonly group = inject(PdsAccordionGroupService, { optional: true });

  /** Texto de la cabecera. */
  readonly title = input.required<string>();

  /**
   * Subtítulo opcional que aparece dentro del panel (no en el trigger).
   * Se renderiza como encabezado H5 antes del contenido proyectado.
   */
  readonly subtitle = input<string | null>(null);

  /** Nombre del ícono Material Symbols que aparece a la izquierda del título. Opcional. */
  readonly iconName = input<string | null>(null);

  /** Estado expandido inicial (solo aplica en modo autónomo; ignorado dentro de group). */
  readonly expanded = input<boolean>(false);

  /** Deshabilita las interacciones. Usa aria-disabled para mantener el tab order. */
  readonly disabled = input<boolean>(false);

  /** Emite el nuevo estado expandido al hacer toggle. */
  readonly expandedChange = output<boolean>();

  protected readonly id = `pds-accordion-${_nextId++}`;
  protected readonly headerId = `${this.id}-header`;
  protected readonly panelId = `${this.id}-panel`;

  /** Estado interno para modo autónomo. */
  private readonly _expanded = signal(false);

  protected readonly isExpanded = computed(() => {
    if (this.group) {
      return this.group.openId() === this.id;
    }
    return this._expanded();
  });

  constructor() {
    // Sincroniza el input `expanded` al estado interno en modo autónomo.
    effect(() => {
      if (!this.group) {
        this._expanded.set(this.expanded());
      }
    });
  }

  protected toggle(): void {
    if (this.disabled()) return;

    if (this.group) {
      const next = this.group.openId() !== this.id;
      if (next) {
        this.group.open(this.id);
      } else {
        this.group.close(this.id);
      }
      this.expandedChange.emit(next);
    } else {
      const next = !this._expanded();
      this._expanded.set(next);
      this.expandedChange.emit(next);
    }
  }
}
