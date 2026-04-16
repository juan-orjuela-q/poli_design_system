import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-page-content',
  imports: [],
  templateUrl: './page-content.component.html',
  styleUrl: './page-content.component.scss'
})
export class PageContentComponent {
  private router = inject(Router);

  // Signal que detecta si estamos en el home
  isHomePage = toSignal(
    this.router.events.pipe(
      map(() => 
        this.router.url === '/' ||
        this.router.url === '/pages' || 
        this.router.url === '/pages/' ||
        this.router.url === '/cpo/home' ||
        this.router.url === '/cpo/home/'
      )
    ),
    { 
      initialValue: 
        this.router.url === '/' ||
        this.router.url === '/pages' || 
        this.router.url === '/pages/' ||
        this.router.url === '/cpo/home' ||
        this.router.url === '/cpo/home/'
    }
  );
}
