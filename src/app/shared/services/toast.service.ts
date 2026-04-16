import { Injectable, ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, inject } from '@angular/core';
import { ApiAlertComponent } from '../components/api-alert/api-alert.component';
import { MessageConfig, MessageType } from '@core/interfaces/api-response.interface';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private toastRefs: ComponentRef<ApiAlertComponent>[] = [];
  private containerElement?: HTMLElement;

  constructor() {
    this.createContainer();
  }

  private createContainer(): void {
    this.containerElement = document.createElement('div');
    this.containerElement.className = 'toast-container';
    this.containerElement.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 400px;
    `;
    document.body.appendChild(this.containerElement);
  }

  private show(config: MessageConfig): void {
    if (!this.containerElement) {
      this.createContainer();
    }

    const componentRef = createComponent(ApiAlertComponent, {
      environmentInjector: this.injector,
      hostElement: document.createElement('div')
    });

    componentRef.setInput('config', config);
    componentRef.setInput('isVisible', true);

    componentRef.instance.closed.subscribe(() => {
      this.remove(componentRef);
    });

    this.appRef.attachView(componentRef.hostView);
    this.containerElement!.appendChild(componentRef.location.nativeElement);
    this.toastRefs.push(componentRef);
  }

  private remove(componentRef: ComponentRef<ApiAlertComponent>): void {
    const index = this.toastRefs.indexOf(componentRef);
    if (index !== -1) {
      this.toastRefs.splice(index, 1);
    }
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }

  success(message: string, title?: string, autoClose: boolean = true): void {
    this.show({
      type: 'success',
      title,
      message,
      autoClose,
      duration: 5000
    });
  }

  error(message: string, title?: string, details?: string[], traceId?: string): void {
    this.show({
      type: 'error',
      title: title || 'Error',
      message,
      details,
      traceId,
      autoClose: false
    });
  }

  warning(message: string, title?: string, autoClose: boolean = true): void {
    this.show({
      type: 'warning',
      title,
      message,
      autoClose,
      duration: 5000
    });
  }

  info(message: string, title?: string, autoClose: boolean = true): void {
    this.show({
      type: 'info',
      title,
      message,
      autoClose,
      duration: 5000
    });
  }

  custom(config: MessageConfig): void {
    this.show(config);
  }
}
