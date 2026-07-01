import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconoComponent } from '../icono/icono.component';

@Component({
  selector: 'app-pie-pagina',
  standalone: true,
  imports: [CommonModule, IconoComponent],
  templateUrl: './pie-pagina.html',
  styleUrls: ['./pie-pagina.scss']
})
export class PiePaginaComponent {
  currentYear = new Date().getFullYear();
}
