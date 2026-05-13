import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AccountInfo, EventMessage, EventType } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly msal = inject(MsalService);
  private readonly msalBroadcast = inject(MsalBroadcastService);

  ngOnInit(): void {
    // initialize() y handleRedirectPromise() ya son gestionados por StartupService
    // vía APP_INITIALIZER, antes de que este componente se monte.
    // Solo necesitamos escuchar LOGIN_SUCCESS para actualizar la cuenta activa
    // en sesiones que se abren en otras pestañas o tras refresh de token interactivo.
    this.msalBroadcast.msalSubject$
      .pipe(filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS))
      .subscribe((msg: EventMessage) => {
        const payload = msg.payload as { account: AccountInfo | null };
        if (payload?.account) {
          this.msal.instance.setActiveAccount(payload.account);
        }
      });
  }
}
