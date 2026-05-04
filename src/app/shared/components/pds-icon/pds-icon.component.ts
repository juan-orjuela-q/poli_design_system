import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

/**
 * **PdsIcon**
 *
 * Estandariza el uso de iconografía (Material Symbols Rounded) en el DS v2.
 *
 * ### Dos casos de uso
 *
 * **Inline** (`shape="none"`, default) — sin fondo ni padding. El ícono hereda
 * el color del padre o toma el del `mode`. Usado dentro de botones, badges, etc.
 *
 * **Standalone** (`shape="circle"` | `"rectangle"`) — contenedor con fondo,
 * padding escalado al tamaño y forma configurable.
 *
 * ### Uso
 * ```html
 * <!-- Inline decorativo -->
 * <pds-icon name="home" />
 *
 * <!-- Standalone con fondo circular -->
 * <pds-icon name="school" mode="brand" shape="circle" size="lg" />
 *
 * <!-- Informativo -->
 * <pds-icon name="warning" mode="error" shape="circle"
 *           [ariaHidden]="false" ariaLabel="Error en el formulario" />
 * ```
 */
@Component({
  selector: 'pds-icon',
  standalone: true,
  imports: [NgClass, MatIconModule],
  templateUrl: './pds-icon.component.html',
  styleUrl: './pds-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsIconComponent {
  /** Nombre del símbolo (Material Symbols Rounded). Requerido. */
  readonly name = input.required<string>();

  /** Tamaño del ícono. Controla font-size y, en modo standalone, el padding. */
  readonly size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');

  /** Modo de color semántico. */
  readonly mode = input<
    | 'neutral'
    | 'brand'
    | 'brand-ghost'
    | 'brand-secondary'
    | 'brand-subtle'
    | 'error'
    | 'success'
    | 'warning'
  >('neutral');

  /**
   * Forma del contenedor cuando el ícono es standalone.
   * - `'none'` (default) — sin contenedor, uso inline.
   * - `'circle'` — contenedor circular con fondo y padding.
   * - `'rectangle'` — contenedor rectangular con esquinas redondeadas.
   */
  readonly shape = input<'none' | 'circle' | 'rectangle'>('none');

  /** Descripción para lectores de pantalla. Solo cuando el ícono es informativo. */
  readonly ariaLabel = input<string | null>(null);

  /** true = decorativo (aria-hidden). false = informativo (requiere ariaLabel). */
  readonly ariaHidden = input<boolean>(true);

  /** Activa variante Material Symbols FILL=1 cuando una excepción de diseño lo requiere. */
  readonly filled = input<boolean>(false);

  protected readonly iconClasses = computed(() =>
    [
      `pds-icon--${this.size()}`,
      `pds-icon--${this.mode()}`,
      this.filled() ? 'pds-icon--filled' : null,
      this.shape() !== 'none' ? `pds-icon--${this.shape()}` : null,
    ].filter(Boolean)
  );
}
