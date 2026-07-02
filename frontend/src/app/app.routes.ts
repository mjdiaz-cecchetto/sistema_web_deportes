import { Routes } from '@angular/router';
import { PaginaProductosComponent } from './client/components/pagina-productos/pagina-productos.component';

import { DetalleProductoComponent } from './client/components/detalle-producto/detalle-producto.component';

import { CheckoutComponent } from './client/components/checkout/checkout.component';

export const routes: Routes = [
  { 
    path: '', 
    component: PaginaProductosComponent,
    children: [
      { path: 'producto/:id', component: DetalleProductoComponent }
    ]
  },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: '' }
];
