import { Injectable, computed, signal, effect } from '@angular/core';
import { ItemCarrito, ResumenCarrito } from '../interfaces/carrito.interface';
import { CamisetaProducto } from '../interfaces/producto.interface';
import { ToastService } from './toast.service';

const UMBRAL_ENVIO_GRATIS = 150;
const COSTO_ENVIO_FIJO = 15;

const CODIGOS_DESCUENTO: Record<string, number> = {
  'DEPORTES20': 0.20, // 20%
  'BIENVENIDA10': 0.10 // 10%
};

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private itemsSignal = signal<ItemCarrito[]>(this.cargarDeLocalStorage());
  private codigoDescuentoSignal = signal<string | null>(null);
  
  public isOpen = signal<boolean>(false);

  constructor(private toastService: ToastService) {
    // Persistir en localstorage cada vez que cambien los items
    effect(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('carrito', JSON.stringify(this.itemsSignal()));
      }
    });
  }

  // Selectors (Computed)
  public items = computed(() => this.itemsSignal());
  
  public resumen = computed<ResumenCarrito>(() => {
    const currentItems = this.itemsSignal();
    const subtotal = currentItems.reduce((acc, item) => {
      const discount = item.producto.discountPercentage ? (item.producto.discountPercentage / 100) : 0;
      const finalPrice = item.producto.price * (1 - discount);
      return acc + (finalPrice * item.cantidad);
    }, 0);
    const cantidadArticulos = currentItems.reduce((acc, item) => acc + item.cantidad, 0);
    
    const codigo = this.codigoDescuentoSignal();
    const porcentajeDescuento = codigo && CODIGOS_DESCUENTO[codigo] ? CODIGOS_DESCUENTO[codigo] : 0;
    const descuento = subtotal * porcentajeDescuento;
    
    const subtotalConDescuento = subtotal - descuento;
    const costoEnvio = (subtotalConDescuento >= UMBRAL_ENVIO_GRATIS || subtotalConDescuento === 0) ? 0 : COSTO_ENVIO_FIJO;
    const faltanteEnvioGratis = subtotalConDescuento >= UMBRAL_ENVIO_GRATIS ? 0 : UMBRAL_ENVIO_GRATIS - subtotalConDescuento;
    
    const total = subtotalConDescuento + costoEnvio;

    return {
      subtotal,
      descuento,
      costoEnvio,
      total,
      cantidadArticulos,
      faltanteEnvioGratis,
      codigoDescuentoAplicado: codigo
    };
  });

  // Actions
  toggleCarrito() {
    this.isOpen.update(val => !val);
  }
  
  abrirCarrito() {
    this.isOpen.set(true);
  }

  cerrarCarrito() {
    this.isOpen.set(false);
  }

  agregarAlCarrito(producto: CamisetaProducto, talla: string) {
    const idItem = `${producto.id}-${talla}`;
    
    this.itemsSignal.update(items => {
      const existingItem = items.find(i => i.idItem === idItem);
      if (existingItem) {
        return items.map(i => i.idItem === idItem ? { ...i, cantidad: i.cantidad + 1 } : i);
      } else {
        return [...items, { idItem, producto, talla, cantidad: 1 }];
      }
    });

    this.toastService.show(`¡${producto.team} añadida al carrito!`, 'success');
  }

  actualizarCantidad(idItem: string, cantidad: number) {
    if (cantidad <= 0) {
      this.removerDelCarrito(idItem);
      return;
    }
    
    this.itemsSignal.update(items => 
      items.map(i => i.idItem === idItem ? { ...i, cantidad } : i)
    );
  }

  removerDelCarrito(idItem: string) {
    this.itemsSignal.update(items => items.filter(i => i.idItem !== idItem));
    this.toastService.show('Artículo eliminado del carrito', 'info');
  }

  aplicarDescuento(codigo: string): boolean {
    const codeUpper = codigo.toUpperCase();
    if (CODIGOS_DESCUENTO[codeUpper]) {
      this.codigoDescuentoSignal.set(codeUpper);
      this.toastService.show(`Código ${codeUpper} aplicado correctamente`, 'success');
      return true;
    }
    this.toastService.show('El código de descuento no es válido', 'error');
    return false;
  }

  removerDescuento() {
    this.codigoDescuentoSignal.set(null);
  }

  vaciarCarrito() {
    this.itemsSignal.set([]);
    this.removerDescuento();
  }

  private cargarDeLocalStorage(): ItemCarrito[] {
    if (typeof localStorage !== 'undefined') {
      const guardado = localStorage.getItem('carrito');
      if (guardado) {
        try {
          return JSON.parse(guardado);
        } catch (e) {
          return [];
        }
      }
    }
    return [];
  }
}
