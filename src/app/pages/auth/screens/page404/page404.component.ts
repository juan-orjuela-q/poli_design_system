import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PdsIconComponent } from '@shared/components/pds-icon/pds-icon.component';
import { PdsButtonComponent } from '@shared/components/pds-button/pds-button.component';

@Component({
  selector: 'app-page404',
  imports: [PdsIconComponent, PdsButtonComponent],
  templateUrl: './page404.component.html',
  styleUrl: './page404.component.scss'
})
export class Page404Component {
  constructor(private router: Router) {}

  submit() {
    this.router.navigate(['/']);
  }
}
