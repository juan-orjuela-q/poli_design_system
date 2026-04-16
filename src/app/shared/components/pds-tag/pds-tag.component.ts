import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';

@Component({
  selector: 'pds-tag',
  standalone: true,
  imports: [NgClass, PdsIconComponent],
  templateUrl: './pds-tag.component.html',
  styleUrl: './pds-tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsTagComponent {
  /** Variante visual del tag. */
  readonly variant = input<'primary' | 'secondary' | 'tertiary'>('primary');

  /** Ícono al inicio del tag (nombre de Material Icon). */
  readonly iconStart = input<string | null>(null);

  /** Texto del tag — usado para generar el aria-label del botón eliminar. */
  readonly label = input<string>('');

  /** Estado deshabilitado (usa aria-disabled, no native disabled). */
  readonly disabled = input<boolean>(false);

  /** Muestra botón de eliminar. */
  readonly removable = input<boolean>(false);

  /** Estado seleccionado. */
  readonly selected = input<boolean>(false);

  /** Emitido al hacer clic en el botón de eliminar. */
  readonly removed = output<void>();

  protected readonly tagClasses = computed(() => ({
    'pds-tag': true,
    [`pds-tag--${this.variant()}`]: true,
    'pds-tag--selected': this.selected(),
    'pds-tag--disabled': this.disabled(),
  }));

  protected readonly removeAriaLabel = computed(() =>
    `Eliminar${this.label() ? ' ' + this.label() : ''}`
  );

  /** Bloquea la acción cuando aria-disabled está activo. */
  protected handleClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  /** Activa el botón de eliminar con teclado (Enter / Space). */
  protected handleRemoveKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onRemove(event);
    }
  }

  protected onRemove(event: Event): void {
    event.stopPropagation();
    if (!this.disabled()) {
      this.removed.emit();
    }
  }
}
