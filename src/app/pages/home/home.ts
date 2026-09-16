import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Menu } from '../../componentes/menu/menu';

@Component({
  selector: 'app-home',
  imports: [Menu],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private auth: Auth) {}
}
