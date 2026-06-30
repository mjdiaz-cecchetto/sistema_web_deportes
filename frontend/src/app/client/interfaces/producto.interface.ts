export interface Producto {
  id: string;
  name: string;
  price: number;
  badge?: string;
  brand: string;
  type: string;
  year: string;
  league?: string;
  image: string;
  imageBack: string;
  sizes: string[];
}
