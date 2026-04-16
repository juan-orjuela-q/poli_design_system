import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { AttachmentItemComponent } from '../attachment-item/attachment-item.component';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, ButtonComponent, AttachmentItemComponent],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() label = 'Archivos adjuntos';
  @Input() required = false;
  @Input() minAttachments = 0;
  @Input() maxAttachments = 1;
  @Input() allowedFileTypes: string[] = [];
  @Input() maxFileSizeMB = 10;
  @Input() helpText = '';
  
  @Output() fileValidationError = new EventEmitter<string>();

  uploadedFiles: File[] = [];
  private onChange: (value: File[]) => void = () => {};
  private onTouched: () => void = () => {};

  get attachmentHelpText(): string {
    if (this.helpText) return this.helpText;
    
    const min = this.minAttachments;
    const max = this.maxAttachments;
    const types = this.allowedFileTypes.join(', ');
    const size = this.maxFileSizeMB;
    
    let text = '';
    if (min === max) {
      text = `Debes adjuntar ${min} archivo(s)`;
    } else if (min > 0) {
      text = `Adjunta entre ${min} y ${max} archivos`;
    } else {
      text = `Adjunta hasta ${max} archivo(s)`;
    }
    
    if (types) {
      text += ` en formato ${types}`;
    }
    
    text += `. Tamaño máximo: ${size}MB por archivo.`;
    
    return text;
  }

  get canAddMoreFiles(): boolean {
    return this.uploadedFiles.length < this.maxAttachments;
  }

  get isAttachmentValid(): boolean {
    if (this.minAttachments === 0 && this.uploadedFiles.length === 0) return true;
    return this.uploadedFiles.length >= this.minAttachments && 
           this.uploadedFiles.length <= this.maxAttachments;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    
    // Validar tipo de archivo
    if (this.allowedFileTypes.length > 0) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
      if (!this.allowedFileTypes.includes(fileExtension)) {
        this.fileValidationError.emit(`Solo se permiten archivos de tipo: ${this.allowedFileTypes.join(', ')}`);
        return;
      }
    }

    // Validar tamaño
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > this.maxFileSizeMB) {
      this.fileValidationError.emit(`El archivo excede el tamaño máximo de ${this.maxFileSizeMB}MB`);
      return;
    }

    // Validar cantidad máxima
    if (this.uploadedFiles.length >= this.maxAttachments) {
      this.fileValidationError.emit(`Solo puedes adjuntar hasta ${this.maxAttachments} archivo(s)`);
      return;
    }

    this.uploadedFiles.push(file);
    this.onChange(this.uploadedFiles);
    this.onTouched();
    
    // Limpiar el input para permitir subir el mismo archivo nuevamente
    input.value = '';
  }

  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
    this.onChange(this.uploadedFiles);
    this.onTouched();
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  // ControlValueAccessor implementation
  writeValue(files: File[]): void {
    this.uploadedFiles = files || [];
  }

  registerOnChange(fn: (value: File[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handle disabled state if needed
  }
}
