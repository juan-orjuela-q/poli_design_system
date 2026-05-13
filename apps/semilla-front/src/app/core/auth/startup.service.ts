import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StartupService {
  async init(): Promise<void> {
    // no-op temporal — MSAL deshabilitado para desarrollo local
  }
}
