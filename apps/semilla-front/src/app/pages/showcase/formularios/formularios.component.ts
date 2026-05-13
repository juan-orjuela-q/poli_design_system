import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  PdsCheckboxGroupComponent,
  PdsInputFieldComponent,
  PdsRadioGroupComponent,
  PdsSelectFieldComponent,
  PdsTextareaFieldComponent,
  PdsToggleComponent,
} from '@poli/components';

@Component({
  selector: 'app-formularios',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PdsInputFieldComponent,
    PdsTextareaFieldComponent,
    PdsSelectFieldComponent,
    PdsCheckboxGroupComponent,
    PdsRadioGroupComponent,
    PdsToggleComponent,
  ],
  templateUrl: './formularios.component.html',
  styleUrl: './formularios.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormulariosComponent implements OnInit {
  private fb = inject(FormBuilder);

  protected readonly selectOptions = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
  ];

  protected readonly checkboxOptions = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
  ];

  protected readonly radioOptions = [
    { value: 'junior', label: 'Junior (0-2 años)' },
    { value: 'mid', label: 'Mid (2-5 años)' },
    { value: 'senior', label: 'Senior (5+ años)' },
  ];

  protected form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    bio: [''],
    framework: [null as string | null],
    technologies: [[] as string[]],
    level: ['mid'],
    notifications: [true],
  });

  ngOnInit(): void {
    // Trigger validation display after submit attempt
  }

  protected onSubmit(): void {
    this.form.markAllAsTouched();
  }

  protected onReset(): void {
    this.form.reset({ level: 'mid', notifications: true, technologies: [] });
  }
}
