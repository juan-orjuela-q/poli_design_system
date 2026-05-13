import { computed, Injectable, signal } from '@angular/core';

export interface UserProfile {
  name: string;
  email: string;
  initials: string;
}

/**
 * UserProfileService - DATOS MOCK para desarrollo local.
 * Restaurar la version con MsalService cuando se active la autenticacion.
 */
@Injectable({ providedIn: 'root' })
export class UserProfileService {
  readonly name = signal('Desarrollador Poli');
  readonly email = signal('dev@poligran.edu.co');
  readonly initials = signal('DP');

  readonly profile = computed<UserProfile>(() => ({
    name: this.name(),
    email: this.email(),
    initials: this.initials(),
  }));
}
