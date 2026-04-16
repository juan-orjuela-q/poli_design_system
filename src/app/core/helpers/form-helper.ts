import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormHelper {

  isFieldInvalid(form: AbstractControl, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(form: AbstractControl, fieldName: string): string {
    const field = form.get(fieldName);

    if (!field || !field.errors || !this.isFieldInvalid(form, fieldName)) {
      return '';
    }

    const errors = field.errors!;

    // Mapeo de errores personalizados
    const errorMessages: { [key: string]: string } = {
      required: 'Este campo es obligatorio',
      minlength: `Mínimo ${errors['minlength']?.requiredLength} caracteres`,
      maxlength: `Máximo ${errors['maxlength']?.requiredLength} caracteres`,
      pattern: 'Formato inválido',
      whitespace: 'El campo no puede estar vacío',
    };

    // Retornar el primer error encontrado
    const firstErrorKey = Object.keys(errors)[0];
    return errorMessages[firstErrorKey] || 'Campo inválido';
  }

  markAllFieldsAsTouched(form: FormGroup<any>): void {
    Object.keys(form.controls).forEach(key => {
      form.get(key)?.markAsTouched();
    });
  }

  markAllFieldsAsUntouched(form: FormGroup<any>): void {
    Object.keys(form.controls).forEach(key => {
      form.get(key)?.markAsUntouched();
    });
  }
}
