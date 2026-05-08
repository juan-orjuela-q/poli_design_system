import { Injectable, signal } from '@angular/core';

/**
 * Servicio proveído por `pds-accordion-group`.
 * Coordina el acordeón exclusivo: solo un ítem puede estar abierto a la vez.
 */
@Injectable()
export class PdsAccordionGroupService {
  private readonly _openId = signal<string | null>(null);
  readonly openId = this._openId.asReadonly();

  open(id: string): void {
    this._openId.set(id);
  }

  close(id: string): void {
    if (this._openId() === id) {
      this._openId.set(null);
    }
  }
}
