import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CamisetaProducto } from '../../interfaces/producto.interface';
import { IconoComponent } from '../icono/icono.component';
import { CarritoService } from '../../services/carrito.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, RouterModule, IconoComponent],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.scss'
})
export class DetalleProductoComponent implements OnInit {
  producto?: CamisetaProducto;
  selectedSize: string | null = null;
  mainImage: string = '';
  isFullscreenImage = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private location: Location,
    public carritoService: CarritoService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productoService.obtenerProductoPorId(id).subscribe(prod => {
        this.producto = prod;
        if (prod && prod.images && prod.images.length > 0) {
          const frontImg = prod.images.find(img => img.view === 'front');
          this.mainImage = frontImg ? frontImg.url : prod.images[0].url;
        }
      });
    }
  }

  get displayName(): string {
    if (!this.producto) return '';
    let name = `${this.producto.team} ${this.producto.season} ${this.producto.type}`;
    if (this.producto.customization) {
      name += ` - ${this.producto.customization.playerName} ${this.producto.customization.number}`;
    }
    return name;
  }

  get hasDiscount(): boolean {
    return !!this.producto?.discountPercentage && this.producto.discountPercentage > 0;
  }

  get finalPrice(): number {
    if (!this.producto) return 0;
    if (this.hasDiscount) {
      return this.producto.price * (1 - (this.producto.discountPercentage! / 100));
    }
    return this.producto.price;
  }

  volver() {
    this.router.navigate(['/']);
  }

  activeImageIndex = 0;

  readonly tallesGenerales = ['S', 'M', 'L', 'XL', 'XXL'];

  getVariantStock(size: string): number {
    return this.producto?.variants?.find(v => v.size === size)?.stock || 0;
  }

  selectSize(size: string) {
    if (this.getVariantStock(size) > 0) {
      this.selectedSize = size;
    } else {
      this.toastService.show(`El talle ${size} no se encuentra disponible en este momento`, 'error');
    }
  }

  setMainImage(imgUrl: string) {
    this.mainImage = imgUrl;
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    const scrollLeft = target.scrollLeft;
    const width = target.clientWidth;
    this.activeImageIndex = Math.round(scrollLeft / width);
  }

  isAdding = false;

  agregarAlCarrito() {
    if (!this.producto) return;
    if (!this.selectedSize) {
      this.toastService.show('Por favor, selecciona una talla antes de añadir al carrito.', 'error');
      return;
    }
    
    this.isAdding = true;
    this.carritoService.agregarAlCarrito(this.producto, this.selectedSize);
    
    setTimeout(() => {
      this.isAdding = false;
    }, 1000);
  }

  verCarrito() {
    this.volver();
    // Use setTimeout to allow the route transition to start before opening the cart overlay
    setTimeout(() => {
      this.carritoService.abrirCarrito();
    }, 50);
  }

  touchStartX = 0;
  touchStartY = 0;
  touchEndX = 0;
  touchEndY = 0;

  onTouchStart(e: TouchEvent) {
    this.touchStartX = e.changedTouches[0].screenX;
    this.touchStartY = e.changedTouches[0].screenY;
  }

  onTouchEnd(e: TouchEvent) {
    this.touchEndX = e.changedTouches[0].screenX;
    this.touchEndY = e.changedTouches[0].screenY;
    
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    // Solo cerrar si es un swipe horizontal (más movimiento en X que en Y) hacia la derecha
    if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 70) {
      this.volver();
    }
  }

  toggleFullscreenImage() {
    this.isFullscreenImage = !this.isFullscreenImage;
  }

  fullScreenTouchStartX = 0;
  fullScreenTouchStartY = 0;

  onFullScreenTouchStart(e: TouchEvent) {
    this.fullScreenTouchStartX = e.changedTouches[0].screenX;
    this.fullScreenTouchStartY = e.changedTouches[0].screenY;
  }

  onFullScreenTouchEnd(e: TouchEvent) {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    
    const deltaX = touchEndX - this.fullScreenTouchStartX;
    const deltaY = touchEndY - this.fullScreenTouchStartY;

    // Detectar swipe horizontal (más en X que en Y y mayor a 70px)
    // Funciona deslizando hacia cualquier lado (izquierda o derecha) por comodidad.
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 70) {
      this.isFullscreenImage = false;
    }
  }
}
