import { Component } from '@angular/core';
import { LoadingBarModule } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-page-loader',
  imports: [LoadingBarModule],
  templateUrl: './page-loader.component.html',
  styleUrl: './page-loader.component.scss',
})
export class PageLoaderComponent {

}
