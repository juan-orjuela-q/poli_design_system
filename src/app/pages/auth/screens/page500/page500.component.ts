import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PdsIconComponent } from '@poli/components';
import { PdsButtonComponent } from '@poli/components';

@Component({
  selector: 'app-page500',
  imports: [PdsIconComponent, PdsButtonComponent],
  templateUrl: './page500.component.html',
  styleUrl: './page500.component.scss'
})
export class Page500Component {
  constructor(private router: Router) {}

  submit() {
    this.router.navigate(['/']);
  }
}

