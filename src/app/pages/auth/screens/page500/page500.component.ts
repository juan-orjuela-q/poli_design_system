import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '@shared/components/icon/icon.component';
import { ButtonComponent } from '@shared/components/button/button.component';
@Component({
  selector: 'app-page500',
  imports: [FormsModule, MatButtonModule, IconComponent, ButtonComponent],
  templateUrl: './page500.component.html',
  styleUrl: './page500.component.scss'
})
export class Page500Component {
  constructor(private router: Router) {}

  submit() {
    this.router.navigate(['/auth/login']);
  }
}

