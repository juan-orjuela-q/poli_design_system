import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PdsButtonComponent } from '@poli/components';
import { PdsIconComponent } from '@poli/components';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PdsButtonComponent, PdsIconComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  protected readonly auth = inject(AuthService);

  login(): void {
    this.auth.login();
  }
}
