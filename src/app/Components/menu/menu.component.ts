import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-menu',
  imports: [MatButtonModule, MatMenuModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {


  constructor(
    private router: Router,
  ){}


  home(){
    this.router.navigate(['home']);
  }

}
