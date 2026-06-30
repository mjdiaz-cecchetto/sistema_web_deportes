import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productosMock: Producto[] = [
    {
      id: '1',
      name: 'Chelsea 23/24 Local - Enzo 8',
      price: 130.00,
      badge: 'Edición Especial',
      brand: 'Nike',
      type: 'Local',
      year: '2023',
      league: 'Premier League',
      image: 'https://images.unsplash.com/photo-1518605368461-1ee51185311b?auto=format&fit=crop&q=80&w=800&h=1000',
      imageBack: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&q=80&w=800&h=1000',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: '2',
      name: 'Argentina 1986 Titular',
      price: 189.99,
      badge: 'Mundialista',
      brand: 'Le Coq Sportif',
      type: 'Local',
      year: '1986',
      league: 'Selecciones',
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800&h=1000',
      imageBack: 'https://images.unsplash.com/photo-1551280857-2b9ebf241ac6?auto=format&fit=crop&q=80&w=800&h=1000',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: '3',
      name: 'Real Madrid 23/24 - Bellingham 5',
      price: 145.00,
      badge: 'Rareza',
      brand: 'Adidas',
      type: 'Local',
      year: '2023',
      league: 'La Liga',
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800&h=1000',
      imageBack: 'https://images.unsplash.com/photo-1508344928928-7137b22349eb?auto=format&fit=crop&q=80&w=800&h=1000',
      sizes: ['M', 'L', 'XL']
    },
    {
      id: '4',
      name: 'Inter Miami 24/25 - Messi 10',
      price: 160.00,
      badge: 'Edición Especial',
      brand: 'Adidas',
      type: 'Visitante',
      year: '2024',
      league: 'MLS',
      image: 'https://images.unsplash.com/photo-1553152531-bc6a073f4e9f?auto=format&fit=crop&q=80&w=800&h=1000',
      imageBack: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&q=80&w=800&h=1000',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: '5',
      name: 'Brasil 2002 Visitante',
      price: 150.00,
      badge: 'Mundialista',
      brand: 'Nike',
      type: 'Visitante',
      year: '2002',
      league: 'Selecciones',
      image: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?auto=format&fit=crop&q=80&w=800&h=1000',
      imageBack: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800&h=1000',
      sizes: ['M', 'L', 'XL', 'XXL']
    },
    {
      id: '6',
      name: 'Boca Juniors 2000 Local',
      price: 250.00,
      badge: 'Vintage',
      brand: 'Nike',
      type: 'Local',
      year: '2000',
      league: 'Argentina',
      image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=800&h=1000',
      imageBack: 'https://images.unsplash.com/photo-1518605368461-1ee51185311b?auto=format&fit=crop&q=80&w=800&h=1000',
      sizes: ['S', 'M', 'L']
    },
    {
      id: '7',
      name: 'Argentina 2022 Local - Messi 10',
      price: 180.00,
      badge: 'Mundialista',
      brand: 'Adidas',
      type: 'Local',
      year: '2022',
      league: 'Selecciones',
      image: 'https://images.unsplash.com/photo-1508344928928-7137b22349eb?auto=format&fit=crop&q=80&w=800&h=1000',
      imageBack: 'https://images.unsplash.com/photo-1551280857-2b9ebf241ac6?auto=format&fit=crop&q=80&w=800&h=1000',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: '8',
      name: 'Flamengo 2024 Local',
      price: 140.00,
      badge: 'Edición Especial',
      brand: 'Adidas',
      type: 'Local',
      year: '2024',
      league: 'Brasil',
      image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&q=80&w=800&h=1000',
      imageBack: 'https://images.unsplash.com/photo-1553152531-bc6a073f4e9f?auto=format&fit=crop&q=80&w=800&h=1000',
      sizes: ['S', 'M', 'L']
    },
    {
      id: '9',
      name: 'PSG 2024 Local',
      price: 145.00,
      badge: 'Rareza',
      brand: 'Nike',
      type: 'Local',
      year: '2024',
      league: 'Ligue 1',
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800&h=1000',
      imageBack: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800&h=1000',
      sizes: ['M', 'L', 'XL']
    },
    {
      id: '10',
      name: 'Portugal 2024 Visitante - CR7 7',
      price: 155.00,
      badge: 'Rareza',
      brand: 'Nike',
      type: 'Visitante',
      year: '2024',
      league: 'Selecciones',
      image: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&q=80&w=800&h=1000',
      imageBack: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=800&h=1000',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: '11',
      name: 'Barcelona 14/15 Local - MSN',
      price: 200.00,
      badge: 'Vintage',
      brand: 'Nike',
      type: 'Local',
      year: '2014',
      league: 'La Liga',
      image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800&h=1000',
      imageBack: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?auto=format&fit=crop&q=80&w=800&h=1000',
      sizes: ['M', 'L']
    },
    {
      id: '12',
      name: 'Francia 2024 Local - Mbappé 10',
      price: 150.00,
      badge: 'Mundialista',
      brand: 'Nike',
      type: 'Local',
      year: '2024',
      league: 'Selecciones',
      image: 'https://images.unsplash.com/photo-1518605368461-1ee51185311b?auto=format&fit=crop&q=80&w=800&h=1000',
      imageBack: 'https://images.unsplash.com/photo-1508344928928-7137b22349eb?auto=format&fit=crop&q=80&w=800&h=1000',
      sizes: ['S', 'M', 'L']
    },
    {
      id: '13',
      name: 'Manchester City 23/24 - Haaland 9',
      price: 140.00,
      badge: 'Edición Especial',
      brand: 'Puma',
      type: 'Local',
      year: '2023',
      league: 'Premier League',
      image: 'https://images.unsplash.com/photo-1551280857-2b9ebf241ac6?auto=format&fit=crop&q=80&w=800&h=1000',
      imageBack: 'https://images.unsplash.com/photo-1518605368461-1ee51185311b?auto=format&fit=crop&q=80&w=800&h=1000',
      sizes: ['M', 'L', 'XL']
    },
    {
      id: '14',
      name: 'Italia 2006 Local - Pirlo 21',
      price: 220.00,
      badge: 'Mundialista',
      brand: 'Puma',
      type: 'Local',
      year: '2006',
      league: 'Selecciones',
      image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&q=80&w=800&h=1000',
      imageBack: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800&h=1000',
      sizes: ['S', 'L']
    },
    {
      id: '15',
      name: 'España 2024 Local - Yamal 19',
      price: 160.00,
      badge: 'Rareza',
      brand: 'Adidas',
      type: 'Local',
      year: '2024',
      league: 'Selecciones',
      image: 'https://images.unsplash.com/photo-1553152531-bc6a073f4e9f?auto=format&fit=crop&q=80&w=800&h=1000',
      imageBack: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800&h=1000',
      sizes: ['S', 'M', 'L']
    },
    {
      id: '16',
      name: 'Milan 06/07 Local - Kaká 22',
      price: 240.00,
      badge: 'Vintage',
      brand: 'Adidas',
      type: 'Local',
      year: '2006',
      league: 'Serie A',
      image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=800&h=1000',
      imageBack: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&q=80&w=800&h=1000',
      sizes: ['M', 'L']
    },
    {
      id: '17',
      name: 'Bayern Munich 24/25 - Kane 9',
      price: 135.00,
      badge: 'Edición Especial',
      brand: 'Adidas',
      type: 'Local',
      year: '2024',
      league: 'Bundesliga',
      image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800&h=1000',
      imageBack: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?auto=format&fit=crop&q=80&w=800&h=1000',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: '18',
      name: 'Arsenal 03/04 - Henry 14',
      price: 280.00,
      badge: 'Vintage',
      brand: 'Nike',
      type: 'Local',
      year: '2003',
      league: 'Premier League',
      image: 'https://images.unsplash.com/photo-1508344928928-7137b22349eb?auto=format&fit=crop&q=80&w=800&h=1000',
      imageBack: 'https://images.unsplash.com/photo-1518605368461-1ee51185311b?auto=format&fit=crop&q=80&w=800&h=1000',
      sizes: ['L', 'XL']
    },
    {
      id: '19',
      name: 'Liverpool 24/25 - Salah 11',
      price: 130.00,
      badge: 'Rareza',
      brand: 'Nike',
      type: 'Local',
      year: '2024',
      league: 'Premier League',
      image: 'https://images.unsplash.com/photo-1518605368461-1ee51185311b?auto=format&fit=crop&q=80&w=800&h=1000',
      imageBack: 'https://images.unsplash.com/photo-1551280857-2b9ebf241ac6?auto=format&fit=crop&q=80&w=800&h=1000',
      sizes: ['S', 'M']
    },
    {
      id: '20',
      name: 'Juventus 15/16 - Pogba 10',
      price: 190.00,
      badge: 'Mundialista',
      brand: 'Adidas',
      type: 'Visitante',
      year: '2015',
      league: 'Serie A',
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800&h=1000',
      imageBack: 'https://images.unsplash.com/photo-1553152531-bc6a073f4e9f?auto=format&fit=crop&q=80&w=800&h=1000',
      sizes: ['M', 'L', 'XL']
    }
  ];

  constructor() { }

  obtenerProductos(): Observable<Producto[]> {
    return of(this.productosMock);
  }

  obtenerProductoPorId(id: string): Observable<Producto | undefined> {
    const prod = this.productosMock.find(p => p.id === id);
    return of(prod);
  }
}
