export interface ProductImage {
  url: string;
  view: 'front' | 'back' | 'detail' | 'showcase';
  alt: string;
}

export interface StockVariant {
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  stock: number;
}

export interface PlayerCustomization {
  playerName: string;
  number: number;
  isHistorical: boolean;
}

export interface CamisetaProducto {
  category: 'Camiseta' | 'Conjunto';
  id: string;
  team: string;
  season: string;
  year: number;
  price: number;
  badge: 'Edición Especial' | 'Mundialista' | 'Rareza' | 'Vintage' | 'Regular';
  brand: 'Nike' | 'Adidas' | 'Puma' | 'Le Coq Sportif' | 'Umbro' | 'Ennerre' | 'Kappa' | 'Lotto';
  type: 'Local' | 'Visitante' | 'Alternativa' | 'Edición Especial';
  league: 'Premier League' | 'La Liga' | 'Serie A' | 'Bundesliga' | 'Ligue 1' | 'MLS' | 'Liga Profesional Argentina' | 'Brasileirão' | 'Selecciones';
  images: ProductImage[];
  variants: StockVariant[];
  customization: PlayerCustomization | null;
  tags: string[];
}
