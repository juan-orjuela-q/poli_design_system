import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PdsAvatarButtonComponent, PdsIconButtonComponent } from '@poli/components';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/auth/auth.service';
import { UserProfileService } from '../../core/services/user-profile.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PdsAvatarButtonComponent, PdsIconButtonComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly auth = inject(AuthService);
  protected readonly userProfile = inject(UserProfileService);
}
