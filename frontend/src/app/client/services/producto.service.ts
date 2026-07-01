import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CamisetaProducto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productosMock: CamisetaProducto[] = [
    {
      id: '1',
      team: 'Argentina',
      season: '2006',
      year: 2006,
      price: 210.00,
      badge: 'Mundialista',
      brand: 'Adidas',
      type: 'Local',
      league: 'Selecciones',
      images: [
        { url: 'assets/images/camisetas/camiseta_1_front.jpg', view: 'front', alt: 'Frente' },
        { url: 'assets/images/camisetas/camiseta_1_back.jpg', view: 'back', alt: 'Dorso' }
      ],
      variants: [{ size: 'S', stock: 5 }, { size: 'M', stock: 12 }, { size: 'L', stock: 0 }, { size: 'XL', stock: 3 }],
      customization: { playerName: 'Messi', number: 19, isHistorical: true },
      tags: ['argentina', 'mundial', 'retro', 'messi']
    },
    {
      id: '2',
      team: 'Brasil',
      season: '1994',
      year: 1994,
      price: 250.00,
      badge: 'Mundialista',
      brand: 'Umbro',
      type: 'Local',
      league: 'Selecciones',
      images: [
        { url: 'assets/images/camisetas/camiseta_2_front.jpg', view: 'front', alt: 'Frente' },
        { url: 'assets/images/camisetas/camiseta_2_back.jpg', view: 'back', alt: 'Dorso' }
      ],
      variants: [{ size: 'S', stock: 2 }, { size: 'M', stock: 0 }, { size: 'L', stock: 1 }, { size: 'XL', stock: 5 }],
      customization: { playerName: 'Cafu', number: 14, isHistorical: true },
      tags: ['brasil', 'mundial', 'retro', 'umbro']
    },
    {
      id: '3',
      team: 'Lazio',
      season: '1999/00',
      year: 1999,
      price: 180.00,
      badge: 'Vintage',
      brand: 'Puma',
      type: 'Local',
      league: 'Serie A',
      images: [
        { url: 'assets/images/camisetas/camiseta_3_front.jpg', view: 'front', alt: 'Frente' },
        { url: 'assets/images/camisetas/camiseta_3_back.jpg', view: 'back', alt: 'Dorso' }
      ],
      variants: [{ size: 'M', stock: 10 }, { size: 'L', stock: 8 }, { size: 'XL', stock: 2 }],
      customization: { playerName: 'Veron', number: 23, isHistorical: true },
      tags: ['lazio', 'serie a', 'retro']
    },
    {
      id: '4',
      team: 'Napoli',
      season: '1988/89',
      year: 1988,
      price: 350.00,
      badge: 'Rareza',
      brand: 'Ennerre',
      type: 'Local',
      league: 'Serie A',
      images: [
        { url: 'assets/images/camisetas/camiseta_4_front.jpg', view: 'front', alt: 'Frente' },
        { url: 'assets/images/camisetas/camiseta_4_back.jpg', view: 'back', alt: 'Dorso' }
      ],
      variants: [{ size: 'S', stock: 0 }, { size: 'M', stock: 2 }, { size: 'L', stock: 0 }],
      customization: { playerName: 'Maradona', number: 10, isHistorical: true },
      tags: ['napoli', 'serie a', 'retro', 'maradona']
    },
    {
      id: '5',
      team: 'Juventus',
      season: '1995/96',
      year: 1995,
      price: 190.00,
      badge: 'Vintage',
      brand: 'Kappa',
      type: 'Visitante',
      league: 'Serie A',
      images: [
        { url: 'assets/images/camisetas/camiseta_5_front.jpg', view: 'front', alt: 'Frente' },
        { url: 'assets/images/camisetas/camiseta_5_back.jpg', view: 'back', alt: 'Dorso' }
      ],
      variants: [{ size: 'S', stock: 5 }, { size: 'M', stock: 15 }, { size: 'L', stock: 20 }, { size: 'XL', stock: 10 }],
      customization: null,
      tags: ['juventus', 'serie a', 'retro', 'kappa']
    },
    {
      id: '6',
      team: 'Atletico Madrid',
      season: '1996/97',
      year: 1996,
      price: 175.00,
      badge: 'Vintage',
      brand: 'Puma',
      type: 'Local',
      league: 'La Liga',
      images: [
        { url: 'assets/images/camisetas/camiseta_6_front.jpg', view: 'front', alt: 'Frente' },
        { url: 'assets/images/camisetas/camiseta_6_back.jpg', view: 'back', alt: 'Dorso' }
      ],
      variants: [{ size: 'M', stock: 3 }, { size: 'L', stock: 2 }, { size: 'XL', stock: 0 }, { size: 'XXL', stock: 1 }],
      customization: { playerName: 'Simeone', number: 14, isHistorical: true },
      tags: ['atletico', 'la liga', 'retro']
    },
    {
      id: '7',
      team: 'Portugal',
      season: '2004',
      year: 2004,
      price: 215.00,
      badge: 'Mundialista',
      brand: 'Nike',
      type: 'Visitante',
      league: 'Selecciones',
      images: [
        { url: 'assets/images/camisetas/camiseta_7_front.jpg', view: 'front', alt: 'Frente' },
        { url: 'assets/images/camisetas/camiseta_7_back.jpg', view: 'back', alt: 'Dorso' }
      ],
      variants: [{ size: 'S', stock: 1 }, { size: 'M', stock: 0 }, { size: 'L', stock: 2 }],
      customization: { playerName: 'C. Ronaldo', number: 16, isHistorical: true },
      tags: ['portugal', 'euro', 'retro', 'ronaldo']
    },
    {
      id: '8',
      team: 'Manchester United',
      season: '1998/99',
      year: 1998,
      price: 280.00,
      badge: 'Rareza',
      brand: 'Umbro',
      type: 'Visitante',
      league: 'Premier League',
      images: [
        { url: 'assets/images/camisetas/camiseta_8_front.jpg', view: 'front', alt: 'Frente' },
        { url: 'assets/images/camisetas/camiseta_8_back.jpg', view: 'back', alt: 'Dorso' }
      ],
      variants: [{ size: 'S', stock: 10 }, { size: 'M', stock: 20 }, { size: 'L', stock: 15 }, { size: 'XL', stock: 5 }],
      customization: { playerName: 'Beckham', number: 10, isHistorical: true },
      tags: ['united', 'premier', 'retro', 'beckham']
    },
    {
      id: '9',
      team: 'AC Milan',
      season: '1995/96',
      year: 1995,
      price: 230.00,
      badge: 'Vintage',
      brand: 'Lotto',
      type: 'Visitante',
      league: 'Serie A',
      images: [
        { url: 'assets/images/camisetas/camiseta_9_front.jpg', view: 'front', alt: 'Frente' },
        { url: 'assets/images/camisetas/camiseta_9_back.jpg', view: 'back', alt: 'Dorso' }
      ],
      variants: [{ size: 'S', stock: 4 }, { size: 'M', stock: 6 }, { size: 'L', stock: 2 }],
      customization: { playerName: 'Baggio', number: 18, isHistorical: true },
      tags: ['milan', 'serie a', 'retro', 'baggio']
    },
    {
      id: '10',
      team: 'Boca Juniors',
      season: '2000',
      year: 2000,
      price: 300.00,
      badge: 'Rareza',
      brand: 'Nike',
      type: 'Local',
      league: 'Liga Profesional Argentina',
      images: [
        { url: 'assets/images/camisetas/camiseta_10_front.jpg', view: 'front', alt: 'Frente' },
        { url: 'assets/images/camisetas/camiseta_10_back.jpg', view: 'back', alt: 'Dorso' }
      ],
      variants: [{ size: 'S', stock: 2 }, { size: 'M', stock: 5 }, { size: 'L', stock: 1 }],
      customization: { playerName: 'Riquelme', number: 10, isHistorical: true },
      tags: ['boca', 'argentina', 'retro', 'riquelme']
    }
  ];

  constructor() { }

  obtenerProductos(): Observable<CamisetaProducto[]> {
    return of(this.productosMock);
  }

  obtenerProductoPorId(id: string): Observable<CamisetaProducto | undefined> {
    const prod = this.productosMock.find(p => p.id === id);
    return of(prod);
  }
}
