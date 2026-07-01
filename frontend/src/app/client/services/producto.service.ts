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
      category: 'Camiseta',
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
      category: 'Camiseta',
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
      category: 'Camiseta',
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
      category: 'Camiseta',
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
      category: 'Camiseta',
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
      category: 'Camiseta',
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
      category: 'Camiseta',
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
      category: 'Camiseta',
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
      category: 'Camiseta',
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
      category: 'Camiseta',
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
    },
    {
      id: '11',
      category: 'Camiseta',
      team: 'Noruega',
      season: '2023/24',
      year: 2023,
      price: 200.00,
      badge: 'Edición Especial',
      brand: 'Nike',
      type: 'Visitante',
      league: 'Selecciones',
      images: [
        { url: 'assets/images/camisetas/camiseta_11_front.jpg', view: 'front', alt: 'Frente' },
        { url: 'assets/images/camisetas/camiseta_11_back.jpg', view: 'back', alt: 'Dorso' }
      ],
      variants: [{ size: 'S', stock: 10 }, { size: 'M', stock: 5 }, { size: 'L', stock: 2 }],
      customization: { playerName: 'Brauthaaland', number: 9, isHistorical: false },
      tags: ['noruega', 'haaland', 'especial']
    },
    {
      id: '12',
      category: 'Camiseta',
      team: 'Manchester United',
      season: '2007/08',
      year: 2007,
      price: 320.00,
      badge: 'Rareza',
      brand: 'Nike',
      type: 'Alternativa',
      league: 'Premier League',
      images: [
        { url: 'assets/images/camisetas/camiseta_12_front.jpg', view: 'front', alt: 'Frente' },
        { url: 'assets/images/camisetas/camiseta_12_back.jpg', view: 'back', alt: 'Dorso' }
      ],
      variants: [{ size: 'S', stock: 1 }, { size: 'M', stock: 3 }, { size: 'L', stock: 0 }],
      customization: { playerName: 'Ronaldo', number: 7, isHistorical: true },
      tags: ['united', 'premier', 'retro', 'ronaldo']
    },
    {
      id: '13',
      category: 'Camiseta',
      team: 'Brasil',
      season: '1998',
      year: 1998,
      price: 250.00,
      badge: 'Mundialista',
      brand: 'Nike',
      type: 'Local',
      league: 'Selecciones',
      images: [
        { url: 'assets/images/camisetas/camiseta_13_front.jpg', view: 'front', alt: 'Frente' },
        { url: 'assets/images/camisetas/camiseta_13_back.jpg', view: 'back', alt: 'Dorso' }
      ],
      variants: [{ size: 'M', stock: 2 }, { size: 'L', stock: 1 }],
      customization: { playerName: 'Ronaldo', number: 9, isHistorical: true },
      tags: ['brasil', 'mundial', 'retro', 'ronaldo']
    },
    {
      id: '14',
      category: 'Camiseta',
      team: 'Boca Juniors',
      season: '2007',
      year: 2007,
      price: 280.00,
      badge: 'Vintage',
      brand: 'Nike',
      type: 'Local',
      league: 'Liga Profesional Argentina',
      images: [
        { url: 'assets/images/camisetas/camiseta_14_front.jpg', view: 'front', alt: 'Frente' },
        { url: 'assets/images/camisetas/camiseta_14_back.jpg', view: 'back', alt: 'Dorso' }
      ],
      variants: [{ size: 'S', stock: 5 }, { size: 'M', stock: 4 }, { size: 'L', stock: 2 }],
      customization: { playerName: 'Roman', number: 10, isHistorical: true },
      tags: ['boca', 'argentina', 'retro', 'riquelme']
    },
    {
      id: '15',
      category: 'Camiseta',
      team: 'AC Milan',
      season: '2006/07',
      year: 2006,
      price: 230.00,
      badge: 'Vintage',
      brand: 'Adidas',
      type: 'Visitante',
      league: 'Serie A',
      images: [
        { url: 'assets/images/camisetas/camiseta_15_front.jpg', view: 'front', alt: 'Frente' },
        { url: 'assets/images/camisetas/camiseta_15_back.jpg', view: 'back', alt: 'Dorso' }
      ],
      variants: [{ size: 'M', stock: 6 }, { size: 'L', stock: 4 }],
      customization: { playerName: 'Kaka', number: 22, isHistorical: true },
      tags: ['milan', 'serie a', 'retro', 'kaka']
    },
    {
      id: '16',
      category: 'Camiseta',
      team: 'AC Milan',
      season: '2008/09',
      year: 2008,
      price: 240.00,
      badge: 'Rareza',
      brand: 'Adidas',
      type: 'Visitante',
      league: 'Serie A',
      images: [
        { url: 'assets/images/camisetas/camiseta_16_front.jpg', view: 'front', alt: 'Frente' },
        { url: 'assets/images/camisetas/camiseta_16_back.jpg', view: 'back', alt: 'Dorso' }
      ],
      variants: [{ size: 'S', stock: 2 }, { size: 'M', stock: 1 }],
      customization: { playerName: 'Beckham', number: 32, isHistorical: true },
      tags: ['milan', 'serie a', 'retro', 'beckham']
    },
    {
      id: '17',
      category: 'Camiseta',
      team: 'AC Milan',
      season: '2008/09',
      year: 2008,
      price: 240.00,
      badge: 'Rareza',
      brand: 'Adidas',
      type: 'Local',
      league: 'Serie A',
      images: [
        { url: 'assets/images/camisetas/camiseta_17_front.jpg', view: 'front', alt: 'Frente' },
        { url: 'assets/images/camisetas/camiseta_17_back.jpg', view: 'back', alt: 'Dorso' }
      ],
      variants: [{ size: 'M', stock: 3 }, { size: 'L', stock: 3 }],
      customization: { playerName: 'Beckham', number: 32, isHistorical: true },
      tags: ['milan', 'serie a', 'retro', 'beckham']
    },
    {
      id: '18',
      category: 'Camiseta',
      team: 'Francia',
      season: '2006',
      year: 2006,
      price: 220.00,
      badge: 'Mundialista',
      brand: 'Adidas',
      type: 'Visitante',
      league: 'Selecciones',
      images: [
        { url: 'assets/images/camisetas/camiseta_18_front.jpg', view: 'front', alt: 'Frente' },
        { url: 'assets/images/camisetas/camiseta_18_back.jpg', view: 'back', alt: 'Dorso' }
      ],
      variants: [{ size: 'S', stock: 2 }, { size: 'L', stock: 5 }],
      customization: { playerName: 'Henry', number: 12, isHistorical: true },
      tags: ['francia', 'mundial', 'retro', 'henry']
    },
    {
      id: '19',
      category: 'Camiseta',
      team: 'Manchester United',
      season: '2006/07',
      year: 2006,
      price: 300.00,
      badge: 'Vintage',
      brand: 'Nike',
      type: 'Visitante',
      league: 'Premier League',
      images: [
        { url: 'assets/images/camisetas/camiseta_19_front.jpg', view: 'front', alt: 'Frente' },
        { url: 'assets/images/camisetas/camiseta_19_back.jpg', view: 'back', alt: 'Dorso' }
      ],
      variants: [{ size: 'M', stock: 1 }],
      customization: { playerName: 'Ronaldo', number: 7, isHistorical: true },
      tags: ['united', 'premier', 'retro', 'ronaldo']
    },
    {
      id: '20',
      category: 'Camiseta',
      team: 'Fiorentina',
      season: '1992/93',
      year: 1992,
      price: 350.00,
      badge: 'Rareza',
      brand: 'Lotto',
      type: 'Local',
      league: 'Serie A',
      images: [
        { url: 'assets/images/camisetas/camiseta_20_front.jpg', view: 'front', alt: 'Frente' },
        { url: 'assets/images/camisetas/camiseta_20_back.jpg', view: 'back', alt: 'Dorso' }
      ],
      variants: [{ size: 'S', stock: 0 }, { size: 'M', stock: 2 }],
      customization: { playerName: 'Batistuta', number: 9, isHistorical: true },
      tags: ['fiorentina', 'serie a', 'retro', 'batistuta']
    },
    {
      id: '21',
      category: 'Conjunto',
      team: 'Arsenal',
      season: '2023/24',
      year: 2023,
      price: 450.00,
      badge: 'Regular',
      brand: 'Adidas',
      type: 'Local',
      league: 'Premier League',
      images: [
        { url: 'assets/images/camisetas/conjunto_21_front.jpg', view: 'front', alt: 'Conjunto Completo' }
      ],
      variants: [{ size: 'S', stock: 5 }, { size: 'M', stock: 10 }, { size: 'L', stock: 2 }],
      customization: null,
      tags: ['arsenal', 'premier', 'conjunto']
    },
    {
      id: '22',
      category: 'Conjunto',
      team: 'Chivas',
      season: '2023/24',
      year: 2023,
      price: 420.00,
      badge: 'Regular',
      brand: 'Puma',
      type: 'Local',
      league: 'MLS',
      images: [
        { url: 'assets/images/camisetas/conjunto_22_front.jpg', view: 'front', alt: 'Conjunto Completo' }
      ],
      variants: [{ size: 'M', stock: 8 }, { size: 'L', stock: 4 }],
      customization: null,
      tags: ['chivas', 'mexico', 'conjunto']
    },
    {
      id: '23',
      category: 'Conjunto',
      team: 'Real Madrid',
      season: '2023/24',
      year: 2023,
      price: 480.00,
      badge: 'Edición Especial',
      brand: 'Adidas',
      type: 'Visitante',
      league: 'La Liga',
      images: [
        { url: 'assets/images/camisetas/conjunto_23_front.jpg', view: 'front', alt: 'Conjunto Completo' }
      ],
      variants: [{ size: 'S', stock: 2 }, { size: 'M', stock: 5 }, { size: 'L', stock: 1 }],
      customization: null,
      tags: ['madrid', 'la liga', 'conjunto']
    },
    {
      id: '24',
      category: 'Conjunto',
      team: 'Atletico Madrid',
      season: '2023/24',
      year: 2023,
      price: 450.00,
      badge: 'Regular',
      brand: 'Nike',
      type: 'Visitante',
      league: 'La Liga',
      images: [
        { url: 'assets/images/camisetas/conjunto_24_front.jpg', view: 'front', alt: 'Conjunto Completo' }
      ],
      variants: [{ size: 'M', stock: 3 }, { size: 'L', stock: 3 }],
      customization: null,
      tags: ['atletico', 'la liga', 'conjunto']
    },
    {
      id: '25',
      category: 'Conjunto',
      team: 'Al Nassr',
      season: '2023/24',
      year: 2023,
      price: 500.00,
      badge: 'Edición Especial',
      brand: 'Adidas',
      type: 'Local',
      league: 'MLS',
      images: [
        { url: 'assets/images/camisetas/conjunto_25_front.jpg', view: 'front', alt: 'Conjunto Completo' }
      ],
      variants: [{ size: 'S', stock: 1 }, { size: 'M', stock: 2 }],
      customization: null,
      tags: ['nassr', 'arabia', 'conjunto']
    },
    {
      id: '26',
      category: 'Conjunto',
      team: 'Inter Miami',
      season: '2023/24',
      year: 2023,
      price: 520.00,
      badge: 'Edición Especial',
      brand: 'Adidas',
      type: 'Visitante',
      league: 'MLS',
      images: [
        { url: 'assets/images/camisetas/conjunto_26_front.jpg', view: 'front', alt: 'Conjunto Completo' }
      ],
      variants: [{ size: 'M', stock: 6 }],
      customization: null,
      tags: ['miami', 'mls', 'conjunto']
    },
    {
      id: '27',
      category: 'Conjunto',
      team: 'Club America',
      season: '2023/24',
      year: 2023,
      price: 430.00,
      badge: 'Regular',
      brand: 'Adidas',
      type: 'Local',
      league: 'MLS',
      images: [
        { url: 'assets/images/camisetas/conjunto_27_front.jpg', view: 'front', alt: 'Conjunto Completo' }
      ],
      variants: [{ size: 'S', stock: 4 }, { size: 'M', stock: 4 }],
      customization: null,
      tags: ['america', 'mexico', 'conjunto']
    },
    {
      id: '28',
      category: 'Conjunto',
      team: 'Santos',
      season: '2023/24',
      year: 2023,
      price: 410.00,
      badge: 'Regular',
      brand: 'Umbro',
      type: 'Visitante',
      league: 'Brasileirão',
      images: [
        { url: 'assets/images/camisetas/conjunto_28_front.jpg', view: 'front', alt: 'Conjunto Completo' }
      ],
      variants: [{ size: 'S', stock: 2 }, { size: 'L', stock: 2 }],
      customization: null,
      tags: ['santos', 'brasil', 'conjunto']
    },
    {
      id: '29',
      category: 'Conjunto',
      team: 'Marseille',
      season: '2023/24',
      year: 2023,
      price: 460.00,
      badge: 'Regular',
      brand: 'Puma',
      type: 'Visitante',
      league: 'Ligue 1',
      images: [
        { url: 'assets/images/camisetas/conjunto_29_front.jpg', view: 'front', alt: 'Conjunto Completo' }
      ],
      variants: [{ size: 'M', stock: 5 }],
      customization: null,
      tags: ['marseille', 'francia', 'conjunto']
    },
    {
      id: '30',
      category: 'Conjunto',
      team: 'Benfica',
      season: '2023/24',
      year: 2023,
      price: 450.00,
      badge: 'Regular',
      brand: 'Adidas',
      type: 'Visitante',
      league: 'Ligue 1',
      images: [
        { url: 'assets/images/camisetas/conjunto_30_front.jpg', view: 'front', alt: 'Conjunto Completo' }
      ],
      variants: [{ size: 'M', stock: 3 }, { size: 'L', stock: 1 }],
      customization: null,
      tags: ['benfica', 'portugal', 'conjunto']
    },
    {
      id: '31',
      category: 'Conjunto',
      team: 'Barcelona',
      season: '2023/24',
      year: 2023,
      price: 490.00,
      badge: 'Edición Especial',
      brand: 'Nike',
      type: 'Visitante',
      league: 'La Liga',
      images: [
        { url: 'assets/images/camisetas/conjunto_31_front.jpg', view: 'front', alt: 'Conjunto Completo' }
      ],
      variants: [{ size: 'S', stock: 2 }, { size: 'M', stock: 8 }],
      customization: null,
      tags: ['barcelona', 'la liga', 'conjunto']
    },
    {
      id: '32',
      category: 'Conjunto',
      team: 'Club America',
      season: '2023/24',
      year: 2023,
      price: 430.00,
      badge: 'Edición Especial',
      brand: 'Adidas',
      type: 'Visitante',
      league: 'MLS',
      images: [
        { url: 'assets/images/camisetas/conjunto_32_front.jpg', view: 'front', alt: 'Conjunto Completo' }
      ],
      variants: [{ size: 'M', stock: 4 }, { size: 'L', stock: 2 }],
      customization: null,
      tags: ['america', 'mexico', 'conjunto']
    },
    {
      id: '33',
      category: 'Conjunto',
      team: 'Brasil',
      season: '2023/24',
      year: 2023,
      price: 470.00,
      badge: 'Regular',
      brand: 'Nike',
      type: 'Local',
      league: 'Selecciones',
      images: [
        { url: 'assets/images/camisetas/conjunto_33_front.jpg', view: 'front', alt: 'Conjunto Completo' }
      ],
      variants: [{ size: 'S', stock: 5 }, { size: 'M', stock: 15 }],
      customization: null,
      tags: ['brasil', 'selecciones', 'conjunto']
    },
    {
      id: '34',
      category: 'Conjunto',
      team: 'Al Nassr',
      season: '2023/24',
      year: 2023,
      price: 500.00,
      badge: 'Regular',
      brand: 'Adidas',
      type: 'Visitante',
      league: 'MLS',
      images: [
        { url: 'assets/images/camisetas/conjunto_34_front.jpg', view: 'front', alt: 'Conjunto Completo' }
      ],
      variants: [{ size: 'M', stock: 4 }],
      customization: null,
      tags: ['nassr', 'arabia', 'conjunto']
    },
    {
      id: '35',
      category: 'Conjunto',
      team: 'Barcelona',
      season: '2023/24',
      year: 2023,
      price: 490.00,
      badge: 'Regular',
      brand: 'Nike',
      type: 'Visitante',
      league: 'La Liga',
      images: [
        { url: 'assets/images/camisetas/conjunto_35_front.jpg', view: 'front', alt: 'Conjunto Completo' }
      ],
      variants: [{ size: 'S', stock: 2 }, { size: 'M', stock: 2 }],
      customization: null,
      tags: ['barcelona', 'la liga', 'conjunto']
    },
    {
      id: '36',
      category: 'Conjunto',
      team: 'Arsenal',
      season: '2023/24',
      year: 2023,
      price: 450.00,
      badge: 'Regular',
      brand: 'Adidas',
      type: 'Local',
      league: 'Premier League',
      images: [
        { url: 'assets/images/camisetas/conjunto_36_front.jpg', view: 'front', alt: 'Conjunto Completo' }
      ],
      variants: [{ size: 'M', stock: 8 }, { size: 'L', stock: 4 }],
      customization: null,
      tags: ['arsenal', 'premier', 'conjunto']
    },
    {
      id: '37',
      category: 'Conjunto',
      team: 'Corinthians',
      season: '2023/24',
      year: 2023,
      price: 440.00,
      badge: 'Regular',
      brand: 'Nike',
      type: 'Local',
      league: 'Brasileirão',
      images: [
        { url: 'assets/images/camisetas/conjunto_37_front.jpg', view: 'front', alt: 'Conjunto Completo' }
      ],
      variants: [{ size: 'S', stock: 4 }, { size: 'L', stock: 1 }],
      customization: null,
      tags: ['corinthians', 'brasil', 'conjunto']
    },
    {
      id: '38',
      category: 'Conjunto',
      team: 'Boca Juniors',
      season: '2023/24',
      year: 2023,
      price: 480.00,
      badge: 'Regular',
      brand: 'Adidas',
      type: 'Local',
      league: 'Liga Profesional Argentina',
      images: [
        { url: 'assets/images/camisetas/conjunto_38_front.jpg', view: 'front', alt: 'Conjunto Completo' }
      ],
      variants: [{ size: 'S', stock: 2 }, { size: 'M', stock: 5 }],
      customization: null,
      tags: ['boca', 'argentina', 'conjunto']
    },
    {
      id: '39',
      category: 'Conjunto',
      team: 'Palmeiras',
      season: '2023/24',
      year: 2023,
      price: 430.00,
      badge: 'Regular',
      brand: 'Puma',
      type: 'Local',
      league: 'Brasileirão',
      images: [
        { url: 'assets/images/camisetas/conjunto_39_front.jpg', view: 'front', alt: 'Conjunto Completo' }
      ],
      variants: [{ size: 'M', stock: 6 }, { size: 'L', stock: 2 }],
      customization: null,
      tags: ['palmeiras', 'brasil', 'conjunto']
    },
    {
      id: '40',
      category: 'Conjunto',
      team: 'Portugal',
      season: '2023/24',
      year: 2023,
      price: 460.00,
      badge: 'Regular',
      brand: 'Puma',
      type: 'Local',
      league: 'Selecciones',
      images: [
        { url: 'assets/images/camisetas/conjunto_40_front.jpg', view: 'front', alt: 'Conjunto Completo' }
      ],
      variants: [{ size: 'S', stock: 3 }, { size: 'M', stock: 7 }],
      customization: null,
      tags: ['portugal', 'selecciones', 'conjunto']
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
