import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './Components/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MenuComponent],
  templateUrl: './app.component.html',
  template: `<app-dashboard></app-dashboard>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TesteTecnico';
}
