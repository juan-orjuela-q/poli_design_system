import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
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
    // Inicializar MSAL y procesar respuesta de redirección
    this.msal.instance.initialize().then(() => {
      this.msal.instance.handleRedirectPromise().then((result) => {
        if (result?.account) {
          this.msal.instance.setActiveAccount(result.account);
        }
      });
    });

    // Establecer cuenta activa cuando MSAL completa el login
    this.msalBroadcast.msalSubject$
      .pipe(filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS))
      .subscribe((msg: EventMessage) => {
        const payload = msg.payload as { account: Parameters<typeof this.msal.instance.setActiveAccount>[0] };
        if (payload?.account) {
          this.msal.instance.setActiveAccount(payload.account);
        }
      });
  }
}
