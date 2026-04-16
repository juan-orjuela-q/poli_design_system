import { Component, Input, Output, EventEmitter, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from '../button/button.component';

/**
 * Componente SimpleStepper - Indicador visual de progreso por pasos
 * 
 * Muestra el paso actual, título, siguiente paso y barra de progreso.
 * En el último paso puede mostrar un mensaje de éxito.
 */
@Component({
  selector: 'app-simple-stepper',
  standalone: true,
  imports: [CommonModule, IconComponent, ButtonComponent],
  templateUrl: './simple-stepper.component.html',
  styleUrls: ['./simple-stepper.component.scss']
})
export class SimpleStepperComponent {
  
  /** Paso actual (1, 2, 3...) */
  @Input({ required: true }) currentStep!: number;
  
  /** Total de pasos del proceso */
  @Input({ required: true }) totalSteps!: number;
  
  /** Título del paso actual */
  @Input({ required: true }) stepTitle!: string;
  
  /** Label del siguiente paso (opcional) */
  @Input() nextStepLabel?: string;
  
  /** Mostrar mensaje de éxito (último paso) */
  @Input() showSuccess = false;
  
  /** Mensaje de éxito personalizable */
  @Input() successMessage = '¡Proceso completado con éxito!';
  
  /** Texto del botón de éxito */
  @Input() successButtonText = 'Regresar al inicio';
  
  /** Evento cuando se da click al botón de éxito */
  @Output() successAction = new EventEmitter<void>();
  
  /**
   * Calcula el porcentaje de progreso basado en el paso actual
   * @returns Porcentaje de 0 a 100
   */
  get progressPercentage(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }
  
  /**
   * Texto del indicador de paso (ej: "Paso 1 de 3")
   */
  get stepIndicator(): string {
    return `Paso ${this.currentStep} de ${this.totalSteps}`;
  }
  
  /**
   * Emite el evento de acción de éxito
   */
  onSuccessClick(): void {
    this.successAction.emit();
  }
}
