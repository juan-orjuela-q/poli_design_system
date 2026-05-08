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

import { PdsIconComponent } from '../pds-icon/pds-icon.component';
import { PdsButtonComponent } from '../pds-button/pds-button.component';

export type DialogMode = 'default' | 'success' | 'warning' | 'error';

let dialogCounter = 0;

@Component({
  selector: 'pds-dialog',
  standalone: true,
  imports: [NgClass, PdsIconComponent, PdsButtonComponent],
  templateUrl: './pds-dialog.component.html',
  styleUrl: './pds-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsDialogComponent implements OnDestroy {
  @ViewChild('dialogEl') dialogEl!: ElementRef<HTMLElement>;

  private readonly focusTrapFactory = inject(FocusTrapFactory);
  private readonly hostEl = inject(ElementRef<HTMLElement>);
  private focusTrap?: FocusTrap;
  private previousFocus?: HTMLElement;

  /** ID único del dialog — necesario para aria-labelledby. */
  readonly dialogId = `pds-dialog-${++dialogCounter}`;
  readonly titleId = `${this.dialogId}-title`;

  // ── Inputs ──────────────────────────────────────────────────────────────

  /** Modo semántico del dialog. Determina colores, ícono y etiqueta del botón de confirmación. */
  readonly mode = input<DialogMode>('default');

  /** Título del dialog. Requerido. */
  readonly title = input.required<string>();

  /** Controla la visibilidad del dialog. */
  readonly open = input<boolean>(false);

  /**
   * Si `true`, hacer clic sobre el overlay cierra el dialog.
   * Default `false` — los dialogs de confirmación no deben cerrarse accidentalmente.
   */
  readonly closeOnOverlay = input<boolean>(false);

  /**
   * Etiqueta del botón de confirmación.
   * Si `null`, se calcula automáticamente: 'Eliminar' para Error, 'Aceptar' para el resto.
   */
  readonly confirmLabel = input<string | null>(null);

  /** Etiqueta del botón de cancelación. */
  readonly cancelLabel = input<string>('Cancelar');

  /** Muestra el botón de cancelación. */
  readonly showCancel = input<boolean>(true);

  /**
   * Si `true`, no bloquea el scroll del body al abrir.
   * Úsar solo en contextos embebidos (ej. Storybook docs).
   */
  readonly disableScrollLock = input<boolean>(false);

  // ── Outputs ─────────────────────────────────────────────────────────────

  /** Emitido al cancelar (botón Cancelar, tecla Escape o clic en overlay si está habilitado). */
  readonly closed = output<void>();

  /** Emitido al confirmar (botón Aceptar / Eliminar). */
  readonly confirmed = output<void>();

  // ── Computed ────────────────────────────────────────────────────────────

  protected readonly resolvedConfirmLabel = computed(
    () =>
      this.confirmLabel() ?? (this.mode() === 'error' ? 'Eliminar' : 'Aceptar')
  );

  protected readonly iconName = computed<string>(() => {
    const map: Record<DialogMode, string> = {
      default: 'feedback',
      error: 'error',
      warning: 'warning',
      success: 'check_circle',
    };
    return map[this.mode()];
  });

  protected readonly dialogClasses = computed(() => ({
    'pds-dialog': true,
    [`pds-dialog--${this.mode()}`]: true,
  }));

  /**
   * Variante del botón de confirmación:
   * - Error → 'destructive' (rojo/magenta sólido)
   * - Resto → 'primary' (azul DS sólido)
   */
  protected readonly confirmVariant = computed(() =>
    this.mode() === 'error' ? 'destructive' : 'primary'
  );

  /**
   * Variante del botón de cancelación:
   * - Error → 'destructive-outline' (borde rojo)
   * - Resto → 'outline' (borde azul DS)
   */
  protected readonly cancelVariant = computed(() =>
    this.mode() === 'error' ? 'destructive-outline' : 'outline'
  );

  // ── Lifecycle ───────────────────────────────────────────────────────────

  constructor() {
    /**
     * Gestión del focus trap y bloqueo del scroll del body.
     * El effect reacciona a cambios en `open()`.
     */
    effect(() => {
      if (this.open()) {
        this.previousFocus = document.activeElement as HTMLElement;
        // setTimeout porque @if del template crea el DOM de forma asíncrona.
        // También asegura que los inputs del padre ya estén aplicados
        // antes de leer disableScrollLock.
        setTimeout(() => {
          if (!this.disableScrollLock()) {
            document.body.style.overflow = 'hidden';
          }
          if (this.dialogEl?.nativeElement) {
            this.focusTrap = this.focusTrapFactory.create(
              this.dialogEl.nativeElement
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

  /** Cierra el dialog al presionar Escape (WCAG 2.1 — SC 1.4.13). */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) this.closed.emit();
  }

  /** Cierra el dialog al hacer clic en el overlay (solo si `closeOnOverlay` es `true`). */
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

  /** Detecta si el overlay está en modo embebido (absolute) — e.g. Storybook docs. */
  private isEmbedded(): boolean {
    const val = getComputedStyle(this.hostEl.nativeElement)
      .getPropertyValue('--pds-overlay-position')
      .trim();
    return val === 'absolute';
  }
}
