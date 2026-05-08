import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PdsButtonComponent, PdsIconComponent } from '@poli/components';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PdsButtonComponent, PdsIconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly auth = inject(AuthService);
}
