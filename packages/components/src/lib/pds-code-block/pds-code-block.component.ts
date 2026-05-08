import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { PdsIconButtonComponent } from '../pds-icon-button/pds-icon-button.component';

/**
 * **PdsCodeBlock**
 *
 * Presenta fragmentos de código o texto técnico en un contenedor estructurado.
 * Incluye cabecera con título (H6), numeración de líneas y botón de copiado.
 *
 * ```html
 * <pds-code-block title="ejemplo.ts" [code]="miCodigo" />
 * ```
 */
@Component({
  selector: 'pds-code-block',
  standalone: true,
  imports: [PdsIconButtonComponent],
  templateUrl: './pds-code-block.component.html',
  styleUrl: './pds-code-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdsCodeBlockComponent {
  /** Nombre del archivo o título mostrado en la cabecera. */
  readonly title = input<string | null>(null);

  /** Muestra la cabecera (título + botón de copia). */
  readonly showHeader = input<boolean>(true);

  /** Muestra el botón de copia en la cabecera. */
  readonly showCopyButton = input<boolean>(true);

  /** Muestra la columna de números de línea. */
  readonly showNumbers = input<boolean>(true);

  /**
   * Altura máxima del área de código. Acepta cualquier valor CSS válido (`px`, `rem`, `vh`, etc.).
   * Si se especifica, el cuerpo produce scroll vertical al superar ese límite.
   * Sin valor, el cuerpo crece con el contenido.
   */
  readonly maxHeight = input<string | null>(null);

  /** El código a mostrar. */
  readonly code = input.required<string>();

  /** Estado del tooltip del botón de copia. */
  protected readonly copyTooltip = signal<'idle' | 'copied'>('idle');

  /** Texto del tooltip según el estado. */
  protected readonly tooltipText = computed(() =>
    this.copyTooltip() === 'copied' ? 'Código copiado' : 'Copiar código'
  );

  /** Ícono del botón de copia según el estado. */
  protected readonly copyIcon = computed(() =>
    this.copyTooltip() === 'copied' ? 'check' : 'content_copy'
  );

  /** Líneas del código para la numeración. */
  protected readonly lines = computed(() => this.code().split('\n'));

  protected async handleCopy(): Promise<void> {
    if (this.copyTooltip() === 'copied') return;

    try {
      await navigator.clipboard.writeText(this.code());
    } catch {
      // Fallback para contextos sin Clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = this.code();
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    this.copyTooltip.set('copied');
    setTimeout(() => this.copyTooltip.set('idle'), 2000);
  }
}
