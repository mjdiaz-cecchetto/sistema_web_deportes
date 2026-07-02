import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconoComponent } from '../icono/icono.component';

@Component({
  selector: 'app-portada',
  standalone: true,
  imports: [CommonModule, IconoComponent],
  templateUrl: './portada.component.html',
  styleUrl: './portada.component.scss'
})
export class PortadaComponent {
  @Output() aplicarFiltro = new EventEmitter<{tipo: string, valor: string}>();

  scrollToCatalog(tipo?: string, valor?: string) {
    if (tipo && valor) {
      this.aplicarFiltro.emit({tipo, valor});
    }
    const catalogo = document.getElementById('catalogo-productos');
    if (catalogo) {
      catalogo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  }
}
