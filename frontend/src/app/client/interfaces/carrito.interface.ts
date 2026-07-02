import { CamisetaProducto } from './producto.interface';

export interface ItemCarrito {
  idItem: string; // Un ID único que combine productoId y talla
  producto: CamisetaProducto;
  talla: string;
  cantidad: number;
}

export interface ResumenCarrito {
  subtotal: number;
  descuento: number;
  costoEnvio: number;
  total: number;
  cantidadArticulos: number;
  faltanteEnvioGratis: number;
  codigoDescuentoAplicado: string | null;
}
