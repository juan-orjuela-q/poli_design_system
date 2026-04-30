import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { PdsIconComponent } from '../pds-icon/pds-icon.component';

/**
 * Tipo de contenido del avatar.
 * - `letter` — Inicial del usuario sobre fondo navy.
 * - `image`  — Fotografía circular del usuario.
 * - `icon`   — Ícono de Material Symbols sobre fondo navy.
 */
export type AvatarType = 'letter' | 'image' | 'icon';

/** Estados visuales del componente (controlan la clase BEM). */
export type AvatarButtonState = 'default' | 'hover' | 'focus' | 'pressed';

let _counter = 0;

@Component({
  selector: 'pds-avatar-button',
  standalone: true,
  imports: [NgClass, PdsIconComponent],
  templateUrl: './pds-avatar-button.component.html',
  styleUrl: './pds-avatar-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsAvatarButtonComponent {
  // ── Inputs ────────────────────────────────────────────────────────────

  /** Nombre completo del usuario. Se muestra junto al avatar y es base del aria-label. */
  readonly name = input.required<string>();

  /** Cargo o rol del usuario (línea secundaria debajo del nombre). */
  readonly role = input<string>('');

  /**
   * Tipo de contenido del avatar.
   * - `letter`  — Usa el primer carácter de `name` o el valor de `letter`.
   * - `image`   — Muestra `imageSrc` en un círculo; requiere `imageSrc`.
   * - `icon`    — Muestra un ícono de Material Symbols; usa `iconName`.
   */
  readonly type = input<AvatarType>('letter');

  /** URL de la imagen (necesario cuando `type === 'image'`). */
  readonly imageSrc = input<string>('');

  /** Letra a mostrar cuando `type === 'letter'`. Por defecto usa la primera letra de `name`. */
  readonly letter = input<string>('');

  /** Nombre del ícono de Material Symbols (necesario cuando `type === 'icon'`). */
  readonly iconName = input<string>('person');

  /** Muestra el indicador de notificación sobre el avatar. */
  readonly showBadge = input<boolean>(false);

  /**
   * Tamaño del avatar (no del botón completo, sino del círculo del avatar).
   * - `md` → 40 px (default Figma) · `lg` → 64 px
   */
  readonly size = input<'md' | 'lg'>('md');

  /** Oculta el nombre y el rol junto al avatar. */
  readonly showName = input<boolean>(true);

  /** Oculta solo el rol (la línea secundaria). */
  readonly showRole = input<boolean>(true);

  /** Tipo HTML del botón. */
  readonly buttonType = input<'button' | 'submit'>('button');

  // ── Outputs ───────────────────────────────────────────────────────────

  /** Emite al hacer clic en el botón (solo cuando no está deshabilitado). */
  readonly clicked = output<void>();

  // ── IDs únicos ────────────────────────────────────────────────────────
  readonly _uid = `pds-avatar-btn-${++_counter}`;

  // ── Computed ──────────────────────────────────────────────────────────

  /** Letra efectiva a mostrar en el avatar. */
  protected readonly resolvedLetter = computed(() => {
    const explicit = this.letter().trim();
    if (explicit) return explicit.charAt(0).toUpperCase();
    return this.name().trim().charAt(0).toUpperCase();
  });

  /** Clases BEM raíz del botón. */
  protected readonly buttonClasses = computed(() => ({
    'pds-avatar-button': true,
    [`pds-avatar-button--${this.size()}`]: true,
    'pds-avatar-button--no-name': !this.showName(),
  }));

  /** Clases del círculo avatar. */
  protected readonly avatarClasses = computed(() => ({
    'pds-avatar-button__pic': true,
    [`pds-avatar-button__pic--${this.size()}`]: true,
    'pds-avatar-button__pic--image': this.type() === 'image',
  }));

  /** aria-label accesible. */
  protected readonly resolvedAriaLabel = computed(() => {
    const base = this.name();
    const role = this.role() ? `, ${this.role()}` : '';
    const badge = this.showBadge() ? ', tiene notificaciones pendientes' : '';
    return `${base}${role}${badge}`;
  });

  // ── Handlers ──────────────────────────────────────────────────────────

  protected handleClick(event: MouseEvent): void {
    this.clicked.emit();
  }

  protected handleKeydown(event: KeyboardEvent): void {
    // No hay lógica de disabled
  }
}
