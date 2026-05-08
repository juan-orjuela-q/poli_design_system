import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PdsButtonComponent, PdsIconComponent } from '@poli/components';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, PdsButtonComponent, PdsIconComponent],
  template: `
    <main class="not-found" role="main">
      <pds-icon name="error" size="xl" aria-hidden="true" />
      <h1 class="not-found__title">Página no encontrada</h1>
      <p class="not-found__body">La URL que buscas no existe o fue movida.</p>
      <pds-button variant="primary" size="md" routerLink="/home">
        Ir al inicio
      </pds-button>
    </main>
  `,
  styles: [`
    .not-found {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-component-lg);
      min-height: 100vh;
      padding: var(--spacing-component-4xl);
      text-align: center;
      background: var(--surface-canvas);

      pds-icon {
        --pds-icon-color: var(--fg-neutral-tertiary);
      }
    }
    .not-found__title {
      font-family: var(--text-headings, Poppins);
      font-size: var(--font-size-f-2xl);
      font-weight: var(--font-weight-w-semibold);
      color: var(--fg-brand-primary);
      margin: 0;
    }
    .not-found__body {
      font-family: var(--text-body, Open Sans);
      font-size: var(--font-size-f-base);
      color: var(--fg-neutral-secondary);
      margin: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
