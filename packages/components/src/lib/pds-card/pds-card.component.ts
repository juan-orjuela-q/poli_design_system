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
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';

export type PdsCardBehavior = 'info' | 'nav' | 'selectable';

@Component({
  selector: 'pds-card',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, PdsIconComponent],
  templateUrl: './pds-card.component.html',
  styleUrl: './pds-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsCardComponent {
  /** Modo de comportamiento de la card. */
  readonly behavior = input<PdsCardBehavior>('info');

  /** Título principal de la card (obligatorio). */
  readonly title = input.required<string>();

  /** Subtítulo opcional debajo del título. */
  readonly subtitle = input<string | null>(null);

  /** Texto descriptivo opcional. */
  readonly description = input<string | null>(null);

  /** Nombre del ícono Material Symbols. Renderiza un contenedor pill con ícono. */
  readonly iconName = input<string | null>(null);

  /** URL de la imagen de cabecera (info y nav). */
  readonly imageSrc = input<string | null>(null);

  /** Alt text de la imagen. */
  readonly imageAlt = input<string>('');

  /** Texto del botón de acción (solo behavior=info con showAction=true). */
  readonly actionLabel = input<string>('Acción');

  /** Muestra el botón de acción en el footer de la card (solo behavior=info). */
  readonly showAction = input<boolean>(false);

  /** Estado seleccionado (solo behavior=selectable). */
  readonly selected = input<boolean>(false);

  /** Deshabilita la interacción en cards nav y selectable. */
  readonly disabled = input<boolean>(false);

  /**
   * Ruta interna de destino (sólo `behavior="nav"`).
   *
   * Con `routerLink` la card se renderiza como un enlace real: se puede abrir en
   * pestaña nueva y un lector de pantalla la anuncia como enlace. Sin él sigue
   * siendo un `role="button"` que emite `cardClick`, útil cuando la acción no es
   * navegar.
   */
  readonly routerLink = input<string | string[] | null>(null);

  /** Emite cuando se hace clic en la card (nav) o en el botón de acción (info). */
  readonly cardClick = output<void>();

  /** Emite el nuevo estado de selección (solo behavior=selectable). */
  readonly selectedChange = output<boolean>();

  // ── Señales internas ──────────────────────────────────────────────────────

  protected readonly _selected = signal(false);

  constructor() {
    // Sincroniza el input selected a la señal interna al montar o cambiar
    effect(() => this._selected.set(this.selected()));
  }

  /**
   * Con routerLink la interacción la lleva el `<a>` interno, no el host: si el
   * host siguiera siendo `role="button"` habría dos controles anidados para la
   * misma acción y el lector de pantalla anunciaría ambos.
   */
  protected readonly isLink = computed(
    () => this.behavior() === 'nav' && !!this.routerLink(),
  );

  protected readonly isInteractive = computed(
    () =>
      (this.behavior() === 'nav' && !this.isLink()) ||
      this.behavior() === 'selectable',
  );

  protected readonly isSelected = computed(
    () => this.behavior() === 'selectable' && this._selected(),
  );

  protected readonly selectIcon = computed(() =>
    this.isSelected() ? 'check_circle' : 'radio_button_unchecked',
  );

  // ── Host bindings ─────────────────────────────────────────────────────────

  @HostBinding('class')
  get hostClass(): string {
    const c = [`pds-card`, `pds-card--${this.behavior()}`];
    if (this.isLink()) c.push('pds-card--link');
    if (this.isSelected()) c.push('pds-card--selected');
    if (this.disabled() && this.isInteractive()) c.push('pds-card--disabled');
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

  /** Clic sobre la nav card enlazada: emite igual, y respeta `disabled`. */
  protected handleLinkClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.cardClick.emit();
  }

  /** Solo para el botón de acción de la info card — no propaga al host. */
  protected onActionClick(event: MouseEvent): void {
    event.stopPropagation();
    this.cardClick.emit();
  }
}
