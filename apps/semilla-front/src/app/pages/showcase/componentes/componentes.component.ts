import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  PdsBadgeComponent,
  PdsButtonComponent,
  PdsCtaComponent,
  PdsIconButtonComponent,
  PdsIconComponent,
  PdsLinkComponent,
  PdsLoadingCircleComponent,
  PdsNotificationComponent,
  PdsTagComponent,
  PdsTooltipComponent,
} from '@poli/components';

@Component({
  selector: 'app-componentes',
  standalone: true,
  imports: [
    PdsButtonComponent,
    PdsIconComponent,
    PdsBadgeComponent,
    PdsTagComponent,
    PdsLinkComponent,
    PdsCtaComponent,
    PdsIconButtonComponent,
    PdsTooltipComponent,
    PdsLoadingCircleComponent,
    PdsNotificationComponent,
  ],
  templateUrl: './componentes.component.html',
  styleUrl: './componentes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentesComponent {}
