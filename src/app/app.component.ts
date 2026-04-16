import { Component } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { PageLoaderComponent } from '@layout/components/page-loader/page-loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, PageLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
