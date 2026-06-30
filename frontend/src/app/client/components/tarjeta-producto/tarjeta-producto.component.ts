import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Producto } from '../../interfaces/producto.interface';
import { IconoComponent } from '../icono/icono.component';

const BADGE_CONFIG: Record<string, { bg: string, text: string, border: string, icon: string }> = {
  'Vintage': { bg: 'bg-indigo-500/10', text: 'text-indigo-500 dark:text-indigo-400', border: 'border-indigo-500/20', icon: 'clock' },
  'Edición Especial': { bg: 'bg-amber-500/10', text: 'text-amber-500 dark:text-amber-400', border: 'border-amber-500/20', icon: 'star' },
  'Mundialista': { bg: 'bg-emerald-500/10', text: 'text-emerald-500 dark:text-emerald-400', border: 'border-emerald-500/20', icon: 'globe' },
  'Rareza': { bg: 'bg-rose-500/10', text: 'text-rose-500 dark:text-rose-400', border: 'border-rose-500/20', icon: 'flame' },
};

@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  imports: [CommonModule, RouterModule, IconoComponent],
  templateUrl: './tarjeta-producto.component.html',
  styleUrl: './tarjeta-producto.component.scss'
})
export class TarjetaProductoComponent {
  @Input() producto!: Producto;
  
  isHovered = false;
  isFavorite = false;
  selectedSize: string | null = null;
  
  get badgeConfig() {
    return this.producto?.badge ? BADGE_CONFIG[this.producto.badge] : null;
  }

  toggleFavorite(event: Event) {
    event.stopPropagation();
    this.isFavorite = !this.isFavorite;
  }

  selectSize(size: string, event: Event) {
    event.stopPropagation();
    this.selectedSize = this.selectedSize === size ? null : size;
  }

  onImageError(event: any) {
    // Reemplazo seguro de imagen si falla por error de red/Unsplash
    event.target.src = 'https://placehold.co/800x1000/171717/333333?text=Imagen+Rota';
  }
}
