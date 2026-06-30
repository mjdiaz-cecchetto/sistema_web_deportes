import { Routes } from '@angular/router';
import { PaginaProductosComponent } from './client/components/pagina-productos/pagina-productos.component';

import { DetalleProductoComponent } from './client/components/detalle-producto/detalle-producto.component';

export const routes: Routes = [
  { path: '', component: PaginaProductosComponent },
  { path: 'producto/:id', component: DetalleProductoComponent },
  { path: '**', redirectTo: '' }
];
