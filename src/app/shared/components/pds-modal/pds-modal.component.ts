import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  output,
  ViewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';

import { PdsIconButtonComponent } from '../pds-icon-button/pds-icon-button.component';
import { PdsButtonComponent } from '../pds-button/pds-button.component';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

let modalCounter = 0;

@Component({
  selector: 'pds-modal',
  standalone: true,
  imports: [NgClass, PdsIconButtonComponent, PdsButtonComponent],
  templateUrl: './pds-modal.component.html',
  styleUrl: './pds-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsModalComponent implements OnDestroy {
  @ViewChild('modalEl') modalEl!: ElementRef<HTMLElement>;

  private readonly focusTrapFactory = inject(FocusTrapFactory);
  private focusTrap?: FocusTrap;
  private previousFocus?: HTMLElement;

  /** ID único del modal — necesario para aria-labelledby. */
  readonly modalId = `pds-modal-${++modalCounter}`;
  readonly titleId = `${this.modalId}-title`;

  // ── Inputs ──────────────────────────────────────────────────────────────

  /**
   * Tamaño del modal. Controla el max-width:
   * SM=420px · MD=560px · LG=720px · XL=900px · 2XL=1200px
   */
  readonly size = input<ModalSize>('md');

  /** Título del modal. Requerido. */
  readonly title = input.required<string>();

  /** Controla la visibilidad del modal. */
  readonly open = input<boolean>(false);

  /**
   * Si `true`, hacer clic sobre el overlay cierra el modal.
   * Default `true` — diferente al Dialog.
   */
  readonly closeOnOverlay = input<boolean>(true);

  /**
   * Muestra el área de acciones (footer) con botones Cancelar + Aceptar.
   * Desactivar cuando el footer se proyecta vía `[slot=footer]`.
   */
  readonly showActions = input<boolean>(true);

  /** Muestra el botón Cancelar en el footer. */
  readonly showCancel = input<boolean>(true);

  /** Etiqueta del botón de confirmación. */
  readonly confirmLabel = input<string>('Aceptar');

  /** Etiqueta del botón de cancelación. */
  readonly cancelLabel = input<string>('Cancelar');

  // ── Outputs ─────────────────────────────────────────────────────────────

  /**
   * Emitido al cerrar el modal:
   * - Botón ✕ del header
   * - Botón Cancelar del footer
   * - Tecla Escape
   * - Clic en overlay (si `closeOnOverlay` es `true`)
   */
  readonly closed = output<void>();

  /** Emitido al hacer clic en el botón de confirmación del footer. */
  readonly confirmed = output<void>();

  // ── Computed ────────────────────────────────────────────────────────────

  protected readonly modalClasses = computed(() => ({
    'pds-modal': true,
    [`pds-modal--${this.size()}`]: true,
  }));

  // ── Lifecycle ───────────────────────────────────────────────────────────

  constructor() {
    effect(() => {
      if (this.open()) {
        this.previousFocus = document.activeElement as HTMLElement;
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
          if (this.modalEl?.nativeElement) {
            this.focusTrap = this.focusTrapFactory.create(
              this.modalEl.nativeElement
            );
            this.focusTrap.focusInitialElementWhenReady();
          }
        });
      } else {
        this.destroyFocusTrap();
        document.body.style.overflow = '';
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyFocusTrap();
    document.body.style.overflow = '';
  }

  // ── Handlers ────────────────────────────────────────────────────────────

  /** Cierra el modal al presionar Escape (WCAG 2.1 — SC 1.4.13). */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) this.closed.emit();
  }

  /** Cierra el modal al hacer clic en el overlay (solo si `closeOnOverlay` es `true`). */
  protected onOverlayClick(): void {
    if (this.closeOnOverlay()) this.closed.emit();
  }

  // ── Private ─────────────────────────────────────────────────────────────

  private destroyFocusTrap(): void {
    this.focusTrap?.destroy();
    this.focusTrap = undefined;
    this.previousFocus?.focus();
    this.previousFocus = undefined;
  }
}
