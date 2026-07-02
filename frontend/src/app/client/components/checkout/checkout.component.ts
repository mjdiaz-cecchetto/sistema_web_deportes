import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { IconoComponent } from '../icono/icono.component';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, IconoComponent],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);
  public carritoService = inject(CarritoService);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private location = inject(Location);

  checkoutForm: FormGroup;
  selectedPaymentMethod: string = 'credit-card';
  currentStep: number = 1;

  provinciasArgentina = [
    'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 
    'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 
    'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 
    'Tierra del Fuego', 'Tucumán', 'Ciudad Autónoma de Buenos Aires (CABA)'
  ].sort();

  paymentMethods = [
    { id: 'credit-card', title: 'Tarjeta de Crédito / Débito', icon: 'credit-card', description: 'Paga de forma segura con tu tarjeta.' },
    { id: 'mercado-pago', title: 'Mercado Pago', icon: 'smartphone', description: 'Usa tu dinero en cuenta o tarjetas guardadas.' },
    { id: 'transfer', title: 'Transferencia Bancaria', icon: 'file-text', description: 'Recibirás los datos bancarios al finalizar.' },
    { id: 'cash', title: 'Efectivo', icon: 'dollar-sign', description: 'Abona en sucursal al retirar tu pedido.' }
  ];

  constructor() {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      document: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      apartment: [''], // Opcional
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required]
    });

    // If cart is empty, redirect to home
    if (this.carritoService.items().length === 0) {
      this.router.navigate(['/']);
    }
  }

  selectPaymentMethod(id: string) {
    this.selectedPaymentMethod = id;
  }

  volver() {
    this.location.back();
  }

  nextStep(step: number) {
    if (step === 1) {
      const email = this.checkoutForm.get('email');
      const phone = this.checkoutForm.get('phone');
      if (email?.valid && phone?.valid) {
        this.currentStep = 2;
      } else {
        email?.markAsTouched();
        phone?.markAsTouched();
        this.toastService.show('Completa los datos de contacto.', 'error');
      }
    } else if (step === 2) {
      const shippingControls = ['firstName', 'lastName', 'document', 'street', 'streetNumber', 'city', 'state', 'zipCode'];
      let isValid = true;
      shippingControls.forEach(ctrl => {
        const control = this.checkoutForm.get(ctrl);
        if (control?.invalid) {
          control.markAsTouched();
          isValid = false;
        }
      });
      if (isValid) {
        this.currentStep = 3;
      } else {
        this.toastService.show('Completa todos los datos de envío.', 'error');
      }
    }
  }

  editStep(step: number) {
    this.currentStep = step;
  }

  procesarPago() {
    if (this.checkoutForm.invalid) {
      this.toastService.show('Por favor, completa todos los campos requeridos correctamente.', 'error');
      return;
    }

    if (this.carritoService.items().length === 0) {
      this.toastService.show('Tu carrito está vacío.', 'error');
      return;
    }

    // Mock payment process
    this.toastService.show('Procesando pago...', 'info');
    
    setTimeout(() => {
      this.carritoService.vaciarCarrito();
      this.toastService.show('¡Compra realizada con éxito! Recibirás un email con los detalles.', 'success');
      this.router.navigate(['/']);
    }, 2000);
  }

  getFinalPrice(producto: any): number {
    if (producto.discountPercentage) {
      return producto.price * (1 - (producto.discountPercentage / 100));
    }
    return producto.price;
  }
}
