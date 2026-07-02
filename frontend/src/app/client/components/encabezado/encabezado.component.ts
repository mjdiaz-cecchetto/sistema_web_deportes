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

  // Lógica de arrastre (Drag) para el FAB del carrito
  fabTransform = 'translate(0px, 0px)';
  private dragStartX = 0;
  private dragStartY = 0;
  private currentX = 0;
  private currentY = 0;
  isDragging = false;
  isDragActive = false;

  onTouchStart(event: TouchEvent) {
    this.isDragging = false;
    this.isDragActive = true;
    this.dragStartX = event.touches[0].clientX - this.currentX;
    this.dragStartY = event.touches[0].clientY - this.currentY;
  }

  onTouchMove(event: TouchEvent) {
    this.isDragging = true;
    let newX = event.touches[0].clientX - this.dragStartX;
    let newY = event.touches[0].clientY - this.dragStartY;
    
    if (isPlatformBrowser(this.platformId)) {
       const margin = 24;
       const size = 56;
       
       const minX = -(window.innerWidth - size - margin);
       const maxX = margin;
       
       const minY = -(window.innerHeight - size - margin);
       const maxY = margin;

       newX = Math.max(minX, Math.min(newX, maxX));
       newY = Math.max(minY, Math.min(newY, maxY));
    }
    
    this.currentX = newX;
    this.currentY = newY;
    this.fabTransform = `translate(${this.currentX}px, ${this.currentY}px)`;
  }

  onTouchEnd(event: TouchEvent) {
    this.isDragActive = false;
  }

  fabClick(event: Event) {
    if (this.isDragging) {
      event.preventDefault();
      event.stopPropagation();
      this.isDragging = false;
      return;
    }
    this.carritoService.toggleCarrito();
  }
}
