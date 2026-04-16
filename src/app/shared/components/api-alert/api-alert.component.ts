import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageConfig, MessageType } from '../../../core/interfaces/api-response.interface';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-api-alert',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './api-alert.component.html',
  styleUrls: ['./api-alert.component.scss']
})
export class ApiAlertComponent implements OnInit, OnDestroy {
  @Input() config!: MessageConfig;
  @Input() isVisible: boolean = true;
  @Output() closed = new EventEmitter<void>();

  private autoCloseTimer?: number;

  // Mapeo de tipos de MessageConfig a tipos de Alert y sus iconos
  private readonly typeMap: Record<MessageType, { alertType: string; icon: string }> = {
    success: { alertType: 'success', icon: 'check_circle' },
    error: { alertType: 'danger', icon: 'dangerous' },
    warning: { alertType: 'warning', icon: 'warning' },
    info: { alertType: 'info', icon: 'feedback' }
  };

  ngOnInit(): void {
    if (this.config?.autoClose) {
      this.setAutoClose();
    }
  }

  ngOnDestroy(): void {
    this.clearAutoClose();
  }

  get alertType(): string {
    return this.typeMap[this.config?.type || 'info'].alertType;
  }

  get icon(): string {
    return this.typeMap[this.config?.type || 'info'].icon;
  }

  get hasTitle(): boolean {
    return !!this.config?.title;
  }

  get hasDetails(): boolean {
    return !!(this.config?.details && this.config.details.length > 0);
  }

  close(): void {
    this.isVisible = false;
    this.clearAutoClose();
    this.closed.emit();
  }

  private setAutoClose(): void {
    const duration = this.config?.duration || 5000;
    this.autoCloseTimer = window.setTimeout(() => {
      this.close();
    }, duration);
  }

  private clearAutoClose(): void {
    if (this.autoCloseTimer) {
      window.clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = undefined;
    }
  }
}
