import { Component, Input, Output, EventEmitter, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { filter, startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  styleUrls: ['./autocomplete.component.scss'],
  templateUrl: './autocomplete.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    IconComponent
  ],
})
export class AutocompleteComponent implements OnInit {
  /** Etiqueta del campo */
  @Input({ required: true }) label!: string;

  /** Placeholder mostrado en el input */
  @Input() placeholder = '';

  /** Lista de opciones que recibe el componente */
  @Input({ required: true }) options: string[] = [];

  /** ID del campo; se genera uno si no se especifica y hay label. */
  @Input() fieldID: string = '';

  /** Marca el campo como requerido. */
  @Input() required: boolean = false;

  /** Tooltip de ayuda contextual. */
  @Input() tooltip?: string;

  /** Emite la opción seleccionada */
  @Output() optionSelected = new EventEmitter<string>();

  /** Control reactivo para manejar el valor del input */
  myControl = new FormControl<string>('');
  /** Opciones filtradas según el texto escrito */
  filteredOptions!: Observable<string[]>;

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value || '')),
    );

    this.fieldID = this.generateId();
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.optionSelected.emit(event.option.value);
  }

  /* ----------------- helpers ----------------- */
  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((opt) => opt.toLowerCase().includes(filterValue));
  }
  
  private generateId(): string {
    return 'input-' + Math.random().toString(36).substring(2, 10);
  }
}
