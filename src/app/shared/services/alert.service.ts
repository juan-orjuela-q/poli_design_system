import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private snack = inject(MatSnackBar);

  private defaultConfig: MatSnackBarConfig = {
    duration: 3500,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };

  private open(message: string, type: AlertType, config?: MatSnackBarConfig) {
    this.snack.open(message, 'Cerrar', {
      ...this.defaultConfig,
      ...config,
      panelClass: ['alert-snack', `alert-${type}`, ...(config?.panelClass ?? [])],
    });
  }

  success(message: string, config?: MatSnackBarConfig) { this.open(message, 'success', config); }
  error(message: string, config?: MatSnackBarConfig) { this.open(message, 'error', config); }
  info(message: string, config?: MatSnackBarConfig) { this.open(message, 'info', config); }
  warning(message: string, config?: MatSnackBarConfig) { this.open(message, 'warning', config); }

}
