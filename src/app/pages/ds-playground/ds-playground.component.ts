import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ds-playground',
  standalone: true,
  imports: [],
  templateUrl: './ds-playground.component.html',
  styleUrl: './ds-playground.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsPlaygroundComponent {}
