import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CamisetaProducto } from '../../interfaces/producto.interface';
import { IconoComponent } from '../icono/icono.component';

const BADGE_CONFIG: Record<string, { bg: string, text: string, border: string, icon: string }> = {
  'Vintage': { bg: 'bg-indigo-500/10', text: 'text-indigo-500 dark:text-indigo-400', border: 'border-indigo-500/20', icon: 'clock' },
  'Edición Especial': { bg: 'bg-amber-500/10', text: 'text-amber-500 dark:text-amber-400', border: 'border-amber-500/20', icon: 'star' },
  'Mundialista': { bg: 'bg-emerald-500/10', text: 'text-emerald-500 dark:text-emerald-400', border: 'border-emerald-500/20', icon: 'globe' },
  'Rareza': { bg: 'bg-rose-500/10', text: 'text-rose-500 dark:text-rose-400', border: 'border-rose-500/20', icon: 'flame' },
  'Regular': { bg: 'bg-neutral-500/10', text: 'text-neutral-500 dark:text-neutral-400', border: 'border-neutral-500/20', icon: 'check' }
};

@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  imports: [CommonModule, RouterModule, IconoComponent],
  templateUrl: './tarjeta-producto.component.html',
  styleUrl: './tarjeta-producto.component.scss'
})
export class TarjetaProductoComponent {
  @Input() producto!: CamisetaProducto;
  
  isHovered = false;
  isFavorite = false;
  selectedSize: string | null = null;
  
  get badgeConfig() {
    return this.producto?.badge ? BADGE_CONFIG[this.producto.badge] : null;
  }

  get mainImage(): string {
    return this.producto?.images?.find(i => i.view === 'front')?.url || '';
  }

  get backImage(): string {
    return this.producto?.images?.find(i => i.view === 'back')?.url || this.mainImage;
  }

  get displayName(): string {
    if (!this.producto) return '';
    let name = `${this.producto.team} ${this.producto.season} ${this.producto.type}`;
    if (this.producto.customization) {
      name += ` - ${this.producto.customization.playerName} ${this.producto.customization.number}`;
    }
    return name;
  }

  get availableSizes(): string[] {
    return this.producto?.variants?.map(v => v.size) || [];
  }

  getVariantStock(size: string): number {
    return this.producto?.variants?.find(v => v.size === size)?.stock || 0;
  }

  toggleFavorite(event: Event) {
    event.stopPropagation();
    this.isFavorite = !this.isFavorite;
  }

  selectSize(size: string, event: Event) {
    event.stopPropagation();
    if (this.getVariantStock(size) > 0) {
      this.selectedSize = this.selectedSize === size ? null : size;
    }
  }

  onImageError(event: any) {
    // Reemplazo seguro de imagen si falla por error de red/Unsplash
    event.target.src = 'https://placehold.co/800x1000/171717/333333?text=Imagen+Rota';
  }
}
