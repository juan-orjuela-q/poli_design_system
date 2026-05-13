import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

/**
 * Estrategia de título personalizada.
 * Lee el campo `title` de los datos de la ruta activa y lo concatena
 * con el nombre del portal para el atributo <title> del documento.
 *
 * Formato: "<Título de la ruta> | Politécnico Grancolombiano"
 * Si la ruta no define título, usa sólo el nombre del portal.
 */
@Injectable({ providedIn: 'root' })
export class AppTitleStrategy extends TitleStrategy {
  private readonly appName = 'Politécnico Grancolombiano';

  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const routeTitle = this.buildTitle(snapshot);
    const documentTitle = routeTitle
      ? `${routeTitle} | ${this.appName}`
      : this.appName;
    this.title.setTitle(documentTitle);
  }
}
