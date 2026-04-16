import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feather-icons',
  imports: [],
  templateUrl: './feather-icons.component.html',
  styleUrl: './feather-icons.component.scss'
})
export class FeatherIconsComponent {
  @Input() public icon?: string;
  @Input() public class?: string;
  constructor() {
    // constructor
  }
}
