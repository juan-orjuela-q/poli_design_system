import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';
import { PdsIconButtonComponent } from '../pds-icon-button/pds-icon-button.component';
import { PdsButtonComponent } from '../pds-button/pds-button.component';

export type NotificationType = 'inline' | 'snackbar' | 'toast';
export type NotificationStatus =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';
export type NotificationActionVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive';

export interface NotificationAction {
  id: string;
  label: string;
  variant?: NotificationActionVariant;
}

@Component({
  selector: 'pds-notification',
  standalone: true,
  imports: [
    NgClass,
    PdsIconComponent,
    PdsIconButtonComponent,
    PdsButtonComponent,
  ],
  templateUrl: './pds-notification.component.html',
  styleUrl: './pds-notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsNotificationComponent implements OnDestroy {
  /** Tipo de presentación: integrado en flujo, flotante inferior o flotante superior derecha. */
  readonly type = input<NotificationType>('inline');

  /** Estado semántico que determina colores e ícono. */
  readonly status = input<NotificationStatus>('default');

  /** Título opcional de la notificación. */
  readonly title = input<string | null>(null);

  /** Muestra el botón para cerrar manualmente. */
  readonly dismissible = input<boolean>(true);

  /** Array de acciones/botones modales (ej: Cancelar, Confirmar). */
  readonly actions = input<NotificationAction[]>([]);

  /**
   * Duración del timer visual en ms.
   * Si `null` o `<= 0`, el timer no se muestra.
   * Default: 30000 (30 segundos).
   */
  readonly timerDuration = input<number | null>(30000);

  /**
   * Tiempo en ms tras el que se emite `dismissed` automáticamente.
   * `null` desactiva el auto-dismiss.
   */
  readonly autoDismiss = input<number | null>(5000);

  /** Emitido cuando la notificación se cierra (manual o automáticamente). */
  readonly dismissed = output<void>();

  /** Emitido cuando se hace click en una acción/botón modal. Emite el ID de la acción. */
  readonly action = output<string>();

  private autoDismissTimer: ReturnType<typeof setTimeout> | null = null;
  private timerIntervalId: ReturnType<typeof setInterval> | null = null;

  /** Progreso del timer: 0-100 (%). */
  protected readonly timerProgress = signal<number>(100);

  /** Ícono Material Symbols para cada estado. */
  protected readonly statusIcon = computed<string>(() => {
    const icons: Record<NotificationStatus, string> = {
      default: 'info',
      success: 'check_circle',
      warning: 'warning',
      error: 'error',
      info: 'info',
    };
    return icons[this.status()];
  });

  /**
   * role="alert" para estados urgentes (error, warning).
   * role="status" para el resto (implica aria-live="polite").
   */
  protected readonly ariaRole = computed<'alert' | 'status'>(() =>
    this.status() === 'error' || this.status() === 'warning'
      ? 'alert'
      : 'status'
  );

  protected readonly hostClasses = computed(() => ({
    'pds-notification': true,
    [`pds-notification--${this.status()}`]: true,
    [`pds-notification--${this.type()}`]: true,
  }));

  protected readonly timerProgressRounded = computed(() =>
    Math.round(this.timerProgress())
  );

  constructor() {
    // Re-create the timer whenever autoDismiss, timerDuration, or type changes.
    effect(() => {
      const delay = this.autoDismiss();
      const duration = this.timerDuration();

      // Limpiar timers previos
      this.clearAutoDismissTimer();
      this.clearTimerInterval();

      // Inicializar progreso al 100%
      this.timerProgress.set(100);

      // Iniciar progreso visual si timerDuration es válido
      if (duration !== null && duration > 0) {
        this.startTimerProgress(duration);
      }

      // Iniciar auto-dismiss si está configurado
      if (delay !== null && delay > 0) {
        this.autoDismissTimer = setTimeout(() => this.dismissed.emit(), delay);
      }
    });
  }

  ngOnDestroy(): void {
    this.clearAutoDismissTimer();
    this.clearTimerInterval();
  }

  protected handleDismiss(): void {
    this.clearAutoDismissTimer();
    this.clearTimerInterval();
    this.dismissed.emit();
  }

  protected handleAction(actionId: string): void {
    this.action.emit(actionId);
  }

  private startTimerProgress(duration: number): void {
    let elapsed = 0;
    const updateInterval = 100; // actualizar cada 100ms

    this.timerIntervalId = setInterval(() => {
      elapsed += updateInterval;
      const progress = Math.max(0, 100 * (1 - elapsed / duration));
      this.timerProgress.set(progress);

      if (progress <= 0) {
        this.clearTimerInterval();
      }
    }, updateInterval);
  }

  private clearAutoDismissTimer(): void {
    if (this.autoDismissTimer !== null) {
      clearTimeout(this.autoDismissTimer);
      this.autoDismissTimer = null;
    }
  }

  private clearTimerInterval(): void {
    if (this.timerIntervalId !== null) {
      clearInterval(this.timerIntervalId);
      this.timerIntervalId = null;
    }
  }
}
