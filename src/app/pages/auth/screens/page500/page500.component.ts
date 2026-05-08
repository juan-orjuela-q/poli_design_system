import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PdsIconComponent } from '@shared/components/pds-icon/pds-icon.component';
import { PdsButtonComponent } from '@shared/components/pds-button/pds-button.component';

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

