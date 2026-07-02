import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { IconoComponent } from '../icono/icono.component';
import { CarritoService } from '../../services/carrito.service';
@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [CommonModule, IconoComponent],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.scss'
})
export class EncabezadoComponent implements OnInit {
  isMobileMenuOpen = false;
  isDarkMode = false;
  
  navLinks = [
    { label: 'Lanzamientos', active: false },
    { label: 'Colección Retro', active: true },
    { label: 'Mundialistas', active: false },
    { label: 'Ediciones Especiales', active: false }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public carritoService: CarritoService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        this.isDarkMode = true;
        document.documentElement.classList.add('dark');
      } else {
        this.isDarkMode = false;
        document.documentElement.classList.remove('dark');
      }
    }
  }

  toggleTheme() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }

  toggleMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (isPlatformBrowser(this.platformId)) {
      if (this.isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }
}
