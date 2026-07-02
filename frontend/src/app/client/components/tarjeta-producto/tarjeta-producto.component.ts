import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CamisetaProducto } from '../../interfaces/producto.interface';
import { IconoComponent } from '../icono/icono.component';
import { CarritoService } from '../../services/carrito.service';
import { ToastService } from '../../services/toast.service';
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
  
  constructor(
    public carritoService: CarritoService,
    private toastService: ToastService
  ) {}

  isHovered = false;
  isFavorite = false;
  selectedSize: string | null = null;
  
  get badgeConfig() {
    return this.producto?.badge ? BADGE_CONFIG[this.producto.badge] : null;
  }

  get hasDiscount(): boolean {
    return !!this.producto?.discountPercentage && this.producto.discountPercentage > 0;
  }

  get finalPrice(): number {
    if (this.hasDiscount) {
      return this.producto.price * (1 - (this.producto.discountPercentage! / 100));
    }
    return this.producto.price;
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

  readonly tallesGenerales = ['S', 'M', 'L', 'XL', 'XXL'];

  get availableSizes(): string[] {
    return this.producto?.variants?.map(v => v.size) || [];
  }

  getVariantStock(size: string): number {
    return this.producto?.variants?.find(v => v.size === size)?.stock || 0;
  }

  get cantidadEnCarrito(): number {
    if (!this.producto) return 0;
    const items = this.carritoService.items();
    return items
      .filter(i => i.producto.id === this.producto.id)
      .reduce((sum, item) => sum + item.cantidad, 0);
  }

  toggleFavorite(event: Event) {
    event.stopPropagation();
    this.isFavorite = !this.isFavorite;
  }

  selectSize(size: string, event: Event) {
    event.stopPropagation();
    if (this.getVariantStock(size) > 0) {
      this.selectedSize = this.selectedSize === size ? null : size;
    } else {
      this.toastService.show(`El talle ${size} no se encuentra disponible en este momento`, 'error');
    }
  }

  onImageError(event: any) {
    // Reemplazo seguro de imagen si falla por error de red/Unsplash
    event.target.src = 'https://placehold.co/800x1000/171717/333333?text=Imagen+Rota';
  }

  isAdding = false;

  agregarAlCarrito(event: Event) {
    event.stopPropagation();
    
    if (!this.selectedSize) {
      this.toastService.show('Selecciona un talle antes de añadir al carrito', 'error');
      return;
    }
    
    this.isAdding = true;
    this.carritoService.agregarAlCarrito(this.producto, this.selectedSize);
    this.selectedSize = null; // Reset selection after adding
    
    // Quitar la animación después de 1 segundo
    setTimeout(() => {
      this.isAdding = false;
    }, 1000);
  }
}
