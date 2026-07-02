import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { IconoComponent } from '../icono/icono.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito-compras',
  standalone: true,
  imports: [CommonModule, IconoComponent, FormsModule],
  template: `
    <!-- Overlay -->
    @if (carritoService.isOpen()) {
      <div class="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity" (click)="carritoService.cerrarCarrito()"></div>
    }

    <!-- Slide-over panel -->
    <div 
      class="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white dark:bg-neutral-900 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col"
      [class.translate-x-0]="carritoService.isOpen()"
      [class.translate-x-full]="!carritoService.isOpen()"
      (touchstart)="onTouchStart($event)"
      (touchend)="onTouchEnd($event)"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
        <h2 class="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <app-icono nombre="shopping-cart" class="w-6 h-6"></app-icono>
          Tu Carrito ({{ carritoService.resumen().cantidadArticulos }})
        </h2>
        <button (click)="carritoService.cerrarCarrito()" class="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 transition-colors">
          <app-icono nombre="x" class="w-5 h-5"></app-icono>
        </button>
      </div>

      <!-- Envío Gratis Progress -->
      @if (carritoService.items().length > 0) {
        <div class="p-4 bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800">
          @if (carritoService.resumen().faltanteEnvioGratis > 0) {
            <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              Te faltan <span class="font-bold text-emerald-600 dark:text-emerald-400">{{ carritoService.resumen().faltanteEnvioGratis * 1000 | currency:'ARS':'symbol-narrow':'1.0-0':'es-AR' }}</span> para envío gratis
            </p>
          } @else {
            <p class="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
              <app-icono nombre="check" class="w-4 h-4"></app-icono>
              ¡Tienes envío gratis!
            </p>
          }
          <div class="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div 
              class="h-full bg-emerald-500 transition-all duration-500"
              [style.width.%]="(1 - (carritoService.resumen().faltanteEnvioGratis / 150)) * 100"
            ></div>
          </div>
        </div>
      }

      <!-- Items -->
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        @if (carritoService.items().length === 0) {
          <div class="flex flex-col items-center justify-center h-full text-center text-neutral-500 dark:text-neutral-400">
            <app-icono nombre="shopping-cart" class="w-16 h-16 mb-4 opacity-50"></app-icono>
            <p class="text-lg font-medium">Tu carrito está vacío</p>
            <p class="text-sm mt-1">¡Añade algunas camisetas para empezar!</p>
            <button (click)="carritoService.cerrarCarrito()" class="mt-6 px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-medium rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
              Explorar productos
            </button>
          </div>
        } @else {
          @for (item of carritoService.items(); track item.idItem) {
            <div class="flex gap-4">
              <!-- Imagen (Usando la imagen principal) -->
              <div class="w-24 h-24 rounded-lg bg-neutral-100 dark:bg-neutral-800 overflow-hidden flex-shrink-0">
                <img [src]="item.producto.images[0].url" [alt]="item.producto.team" class="w-full h-full object-cover">
              </div>
              
              <!-- Detalles -->
              <div class="flex-1 flex flex-col">
                <div class="flex justify-between gap-2">
                  <h3 class="font-medium text-neutral-900 dark:text-white line-clamp-2">{{ item.producto.team }} {{ item.producto.season }}</h3>
                  <div class="flex flex-col items-end flex-shrink-0">
                    @if (item.producto.discountPercentage) {
                      <p class="text-[10px] text-neutral-400 line-through">
                        {{ item.producto.price * 1000 | currency:'ARS':'symbol-narrow':'1.0-0':'es-AR' }}
                      </p>
                    }
                    <p class="font-bold" [ngClass]="item.producto.discountPercentage ? 'text-rose-500' : 'text-neutral-900 dark:text-white'">
                      {{ getFinalPrice(item.producto) * 1000 | currency:'ARS':'symbol-narrow':'1.0-0':'es-AR' }}
                    </p>
                  </div>
                </div>
                <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Talla: {{ item.talla }}</p>
                
                <div class="mt-auto flex items-center justify-between">
                  <!-- Controles de cantidad -->
                  <div class="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-full px-2 py-0.5">
                    <button (click)="carritoService.actualizarCantidad(item.idItem, item.cantidad - 1)" class="p-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                      <app-icono [nombre]="item.cantidad === 1 ? 'trash' : 'minus'" [size]="14"></app-icono>
                    </button>
                    <span class="text-sm font-semibold w-4 text-center dark:text-white">{{ item.cantidad }}</span>
                    <button (click)="carritoService.actualizarCantidad(item.idItem, item.cantidad + 1)" class="p-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                      <app-icono nombre="plus" [size]="14"></app-icono>
                    </button>
                  </div>
                  
                  <!-- Eliminar -->
                  <button (click)="carritoService.removerDelCarrito(item.idItem)" class="text-sm text-rose-500 hover:text-rose-600 font-medium transition-colors">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          }
        }
      </div>

      <!-- Footer / Totales -->
      @if (carritoService.items().length > 0) {
        <div class="border-t border-neutral-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-900 space-y-4">
          
          <!-- Código de descuento -->
          <div class="flex gap-2">
            <input 
              type="text" 
              [(ngModel)]="codigoInput"
              placeholder="Código de descuento" 
              class="flex-1 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white"
            >
            <button (click)="aplicarCodigo()" class="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200">
              Aplicar
            </button>
          </div>
          
          @if (carritoService.resumen().codigoDescuentoAplicado) {
            <div class="flex justify-between items-center bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 p-2 rounded-lg text-sm">
              <span>Cupón {{ carritoService.resumen().codigoDescuentoAplicado }} aplicado</span>
              <button (click)="carritoService.removerDescuento()" class="hover:text-emerald-900 dark:hover:text-emerald-200">
                <app-icono nombre="x" class="w-4 h-4"></app-icono>
              </button>
            </div>
          }

          <!-- Totales -->
          <div class="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>{{ carritoService.resumen().subtotal * 1000 | currency:'ARS':'symbol-narrow':'1.0-0':'es-AR' }}</span>
            </div>
            @if (carritoService.resumen().descuento > 0) {
              <div class="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span>Descuento</span>
                <span>-{{ carritoService.resumen().descuento * 1000 | currency:'ARS':'symbol-narrow':'1.0-0':'es-AR' }}</span>
              </div>
            }
            <div class="flex justify-between">
              <span>Envío</span>
              <span>{{ carritoService.resumen().costoEnvio === 0 ? 'Gratis' : (carritoService.resumen().costoEnvio * 1000 | currency:'ARS':'symbol-narrow':'1.0-0':'es-AR') }}</span>
            </div>
          </div>
          
          <div class="flex justify-between items-end pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <span class="text-base font-medium text-neutral-900 dark:text-white">Total</span>
            <span class="text-2xl font-bold text-neutral-900 dark:text-white">{{ carritoService.resumen().total * 1000 | currency:'ARS':'symbol-narrow':'1.0-0':'es-AR' }}</span>
          </div>
          
          <button (click)="procederAlPago()" class="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-lg shadow-black/10 dark:shadow-white/10 mt-4">
            Proceder al Pago
          </button>
        </div>
      }
    </div>
  `
})
export class CarritoComprasComponent {
  carritoService = inject(CarritoService);
  private router = inject(Router);
  codigoInput = '';

  procederAlPago() {
    this.carritoService.cerrarCarrito();
    setTimeout(() => {
      this.router.navigate(['/checkout']);
    }, 300);
  }

  getFinalPrice(producto: any): number {
    if (producto.discountPercentage) {
      return producto.price * (1 - (producto.discountPercentage / 100));
    }
    return producto.price;
  }

  aplicarCodigo() {
    if (this.codigoInput.trim()) {
      const success = this.carritoService.aplicarDescuento(this.codigoInput.trim());
      if (success) {
        this.codigoInput = ''; // Limpiar si fue exitoso
      }
    }
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
      this.carritoService.cerrarCarrito();
    }
  }
}
