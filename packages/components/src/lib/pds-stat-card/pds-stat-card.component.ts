import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';
import { PdsBadgeComponent } from '../pds-badge/pds-badge.component';

export type PdsStatCardBehavior = 'info' | 'nav' | 'selectable';

@Component({
  selector: 'pds-stat-card',
  standalone: true,
  imports: [PdsIconComponent, PdsBadgeComponent],
  templateUrl: './pds-stat-card.component.html',
  styleUrl: './pds-stat-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsStatCardComponent {
  /** Modo de comportamiento de la stat card. */
  readonly behavior = input<PdsStatCardBehavior>('info');

  /** Nombre del ícono Material Symbols (obligatorio). */
  readonly iconName = input.required<string>();

  /** Etiqueta descriptiva de la métrica (ej. "Active users"). */
  readonly label = input.required<string>();

  /** Valor principal de la métrica (ej. "12.480"). */
  readonly value = input.required<string>();

  /** Valor de la tendencia (ej. "+12.5%"). Muestra la sección More Info si se define. */
  readonly trendValue = input<string | null>(null);

  /** Texto de contexto de la tendencia (ej. "vs last month"). */
  readonly trendLabel = input<string | null>(null);

  /** Estado/color del badge indicador. Acepta cualquier valor de PdsBadge status. */
  readonly badgeStatus = input<
    'brand' | 'brand-subtle' | 'brand-secondary' | 'neutral' | 'success' | 'warning' | 'error'
  >('neutral');

  /** Ícono del badge indicador (Material Symbols). null = sin ícono. */
  readonly badgeIcon = input<string | null>(null);

  /** Estado seleccionado (solo behavior=selectable). */
  readonly selected = input<boolean>(false);

  /** Deshabilita la interacción en cards nav y selectable. */
  readonly disabled = input<boolean>(false);

  /** Emite cuando se hace clic en la card (nav) o se cambia la selección (selectable). */
  readonly cardClick = output<void>();

  /** Emite el nuevo estado de selección (solo behavior=selectable). */
  readonly selectedChange = output<boolean>();

  // ── Señales internas ──────────────────────────────────────────────────────

  protected readonly _selected = signal(false);

  constructor() {
    effect(() => this._selected.set(this.selected()));
  }

  protected readonly isInteractive = computed(
    () => this.behavior() === 'nav' || this.behavior() === 'selectable',
  );

  protected readonly isSelected = computed(
    () => this.behavior() === 'selectable' && this._selected(),
  );

  protected readonly selectIcon = computed(() =>
    this.isSelected() ? 'check_circle' : 'radio_button_unchecked',
  );

  protected readonly showTrend = computed(() => this.trendValue() !== null);

  // ── Host bindings ─────────────────────────────────────────────────────────

  @HostBinding('class')
  get hostClass(): string {
    const c = [`pds-stat-card`, `pds-stat-card--${this.behavior()}`];
    if (this.isSelected()) c.push('pds-stat-card--selected');
    if (this.disabled() && this.isInteractive()) c.push('pds-stat-card--disabled');
    return c.join(' ');
  }

  @HostBinding('attr.role')
  get role(): string | null {
    return this.isInteractive() ? 'button' : null;
  }

  @HostBinding('attr.tabindex')
  get tabindex(): number | null {
    if (!this.isInteractive()) return null;
    return this.disabled() ? -1 : 0;
  }

  @HostBinding('attr.aria-pressed')
  get ariaPressed(): boolean | null {
    if (this.behavior() !== 'selectable') return null;
    return this.isSelected();
  }

  @HostBinding('attr.aria-disabled')
  get ariaDisabled(): true | null {
    return this.disabled() && this.isInteractive() ? true : null;
  }

  // ── Eventos ───────────────────────────────────────────────────────────────

  @HostListener('click', ['$event'])
  handleClick(event: Event): void {
    if (!this.isInteractive()) return;
    if (this.disabled()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (this.behavior() === 'selectable') {
      const next = !this._selected();
      this._selected.set(next);
      this.selectedChange.emit(next);
    }
    this.cardClick.emit();
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (!this.isInteractive()) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick(event);
    }
  }
}
