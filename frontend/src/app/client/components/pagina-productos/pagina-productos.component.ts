import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto.interface';
import { IconoComponent } from '../icono/icono.component';
import { PortadaComponent } from '../portada/portada.component';
import { TarjetaProductoComponent } from '../tarjeta-producto/tarjeta-producto.component';
import { EncabezadoComponent } from '../encabezado/encabezado.component';

@Component({
  selector: 'app-pagina-productos',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IconoComponent, 
    PortadaComponent, 
    TarjetaProductoComponent,
    EncabezadoComponent
  ],
  templateUrl: './pagina-productos.component.html',
  styleUrl: './pagina-productos.component.scss'
})
export class PaginaProductosComponent implements OnInit {
  productos: Producto[] = [];
  
  // Estados
  busqueda: string = '';
  marcaActiva: string = 'All'; // Esto funciona como filtro "Retro" o "Todos"
  
  // Nuevos filtros
  ligaActiva: string = 'Todas';
  ordenActivo: string = 'Mayor Precio';
  
  // Dropdowns UI
  isLigaMenuOpen: boolean = false;
  isOrdenMenuOpen: boolean = false;

  isDarkMode: boolean = true;
  isMobileMenuOpen: boolean = false;
  
  ligas = ['Todas', 'Argentina', 'Brasil', 'Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'Selecciones'];
  ordenes = ['Recomendados', 'Mayor Precio', 'Menor Precio'];

  constructor(
    private productoService: ProductoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.productoService.obtenerProductos().subscribe(data => {
      this.productos = data;
    });
    
    // Configurar modo oscuro por defecto en el cliente
    if (isPlatformBrowser(this.platformId)) {
      this.actualizarModoOscuro();
    }
  }

  toggleModoOscuro() {
    this.isDarkMode = !this.isDarkMode;
    if (isPlatformBrowser(this.platformId)) {
      this.actualizarModoOscuro();
    }
  }

  private actualizarModoOscuro() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleMenuMovil() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  cambiarMarca(marca: string) {
    this.marcaActiva = marca;
  }

  toggleLigaMenu() {
    this.isLigaMenuOpen = !this.isLigaMenuOpen;
    this.isOrdenMenuOpen = false;
  }

  seleccionarLiga(liga: string) {
    this.ligaActiva = liga;
    this.isLigaMenuOpen = false;
  }

  toggleOrdenMenu() {
    this.isOrdenMenuOpen = !this.isOrdenMenuOpen;
    this.isLigaMenuOpen = false;
  }

  seleccionarOrden(orden: string) {
    this.ordenActivo = orden;
    this.isOrdenMenuOpen = false;
  }

  get productosFiltrados(): Producto[] {
    let filtrados = this.productos.filter(producto => {
      const searchLower = this.busqueda.toLowerCase();
      const matchesSearch = producto.name.toLowerCase().includes(searchLower) || 
                            producto.brand.toLowerCase().includes(searchLower) ||
                            producto.year.includes(searchLower);
      
      const isRetro = parseInt(producto.year) <= 2010 || producto.badge === 'Vintage' || producto.badge === 'Mundialista';
      // marcaActiva se usa como Tipo (All / Retro)
      const matchesTipo = this.marcaActiva === 'All' || (this.marcaActiva === 'Retro' && isRetro);

      const matchesLiga = this.ligaActiva === 'Todas' || producto.league === this.ligaActiva;

      return matchesSearch && matchesTipo && matchesLiga;
    });

    if (this.ordenActivo === 'Mayor Precio') {
      filtrados.sort((a, b) => b.price - a.price);
    } else if (this.ordenActivo === 'Menor Precio') {
      filtrados.sort((a, b) => a.price - b.price);
    }
    
    return filtrados;
  }
}
