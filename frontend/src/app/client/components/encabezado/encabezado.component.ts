import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconoComponent } from '../icono/icono.component';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [CommonModule, IconoComponent],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.scss'
})
export class EncabezadoComponent {
  isMobileMenuOpen = false;
  
  navLinks = [
    { label: 'Lanzamientos', active: false },
    { label: 'Colección Retro', active: true },
    { label: 'Mundialistas', active: false },
    { label: 'Ediciones Especiales', active: false }
  ];

  toggleMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}
