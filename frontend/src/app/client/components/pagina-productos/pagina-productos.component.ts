import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { CamisetaProducto } from '../../interfaces/producto.interface';
import { IconoComponent } from '../icono/icono.component';
import { PortadaComponent } from '../portada/portada.component';
import { TarjetaProductoComponent } from '../tarjeta-producto/tarjeta-producto.component';
import { EncabezadoComponent } from '../encabezado/encabezado.component';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';

@Component({
  selector: 'app-pagina-productos',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IconoComponent, 
    PortadaComponent, 
    TarjetaProductoComponent,
    EncabezadoComponent,
    PiePaginaComponent,
    RouterOutlet
  ],
  templateUrl: './pagina-productos.component.html',
  styleUrl: './pagina-productos.component.scss'
})
export class PaginaProductosComponent implements OnInit {
  productos: CamisetaProducto[] = [];
  
  // Estados
  busqueda: string = '';
  marcaActiva: string = 'All'; // Esto funciona como filtro "Retro" o "Todos"
  
  // Nuevos filtros
  ligaActiva: string = 'Todas';
  seleccionActiva: string = 'Todas';
  ordenActivo: string = 'Recomendados';
  categoriaActiva: string = 'Todas';
  
  // Paginación
  paginaActual: number = 1;
  itemsPorPagina: number = 12;

  // Dropdowns UI
  isLigaMenuOpen: boolean = false;
  isSeleccionMenuOpen: boolean = false;
  isOrdenMenuOpen: boolean = false;
  isCategoriaMenuOpen: boolean = false;

  isMobileMenuOpen: boolean = false;
  
  ligas = ['Todas', 'Liga Profesional Argentina', 'Brasileirão', 'Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'MLS'];
  selecciones = ['Todas', 'Argentina', 'Brasil', 'Alemania', 'España', 'Francia', 'Inglaterra', 'Italia', 'Portugal'];
  ordenes = ['Recomendados', 'Mayor Precio', 'Menor Precio'];
  categorias = ['Todas', 'Camisetas', 'Conjuntos'];

  constructor(
    private productoService: ProductoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.productoService.obtenerProductos().subscribe(data => {
      this.productos = data;
    });
  }

  toggleMenuMovil() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  actualizarBusqueda(termino: string) {
    this.busqueda = termino;
    this.paginaActual = 1;
  }

  cambiarMarca(marca: string) {
    this.marcaActiva = marca;
    this.paginaActual = 1;
  }

  toggleCategoriaMenu() {
    this.isCategoriaMenuOpen = !this.isCategoriaMenuOpen;
    this.isLigaMenuOpen = false;
    this.isSeleccionMenuOpen = false;
    this.isOrdenMenuOpen = false;
  }

  seleccionarCategoria(categoria: string) {
    this.categoriaActiva = categoria;
    this.isCategoriaMenuOpen = false;
    this.paginaActual = 1;
  }

  toggleLigaMenu() {
    this.isLigaMenuOpen = !this.isLigaMenuOpen;
    this.isSeleccionMenuOpen = false;
    this.isOrdenMenuOpen = false;
    this.isCategoriaMenuOpen = false;
  }

  seleccionarLiga(liga: string) {
    this.ligaActiva = liga;
    this.seleccionActiva = 'Todas'; // Mutuamente excluyente con selecciones
    this.isLigaMenuOpen = false;
    this.paginaActual = 1;
  }

  toggleSeleccionMenu() {
    this.isSeleccionMenuOpen = !this.isSeleccionMenuOpen;
    this.isLigaMenuOpen = false;
    this.isOrdenMenuOpen = false;
    this.isCategoriaMenuOpen = false;
  }

  seleccionarSeleccion(seleccion: string) {
    this.seleccionActiva = seleccion;
    this.ligaActiva = 'Todas'; // Mutuamente excluyente con ligas
    this.isSeleccionMenuOpen = false;
    this.paginaActual = 1;
  }

  toggleOrdenMenu() {
    this.isOrdenMenuOpen = !this.isOrdenMenuOpen;
    this.isLigaMenuOpen = false;
    this.isSeleccionMenuOpen = false;
    this.isCategoriaMenuOpen = false;
  }

  seleccionarOrden(orden: string) {
    this.ordenActivo = orden;
    this.isOrdenMenuOpen = false;
    this.paginaActual = 1;
  }

  limpiarFiltros() {
    this.busqueda = '';
    this.ligaActiva = 'Todas';
    this.seleccionActiva = 'Todas';
    this.marcaActiva = 'All';
    this.categoriaActiva = 'Todas';
    this.paginaActual = 1;
  }

  aplicarFiltroDesdePortada(filtro: {tipo: string, valor: string}) {
    this.limpiarFiltros();
    
    if (filtro.tipo === 'marca') {
      this.marcaActiva = filtro.valor;
    } else if (filtro.tipo === 'categoria') {
      this.categoriaActiva = filtro.valor;
    } else if (filtro.tipo === 'liga') {
      this.ligaActiva = filtro.valor;
    } else if (filtro.tipo === 'seleccion') {
      this.seleccionActiva = filtro.valor;
    }
  }

  get totalPaginas(): number {
    return Math.ceil(this.productosFiltrados.length / this.itemsPorPagina);
  }

  get paginas(): number[] {
    const total = this.totalPaginas;
    const pages = [];
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }

  get productosPaginados(): CamisetaProducto[] {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.productosFiltrados.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas && nuevaPagina !== this.paginaActual) {
      
      const doScroll = () => {
        const isMobile = window.innerWidth < 1024;
        const targetElement = document.getElementById('catalogo-productos');
        
        if (targetElement) {
          // En mobile offseteamos 140px por los filtros sticky, en desktop 80px por el header
          const offset = isMobile ? 140 : 80;
          const top = targetElement.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      };

      if ((document as any).startViewTransition) {
        const transition = (document as any).startViewTransition(() => {
          this.paginaActual = nuevaPagina;
          this.cdr.detectChanges();
        });
        
        if (transition && transition.ready) {
          transition.ready.then(() => doScroll()).catch(() => doScroll());
        } else {
          doScroll();
        }
      } else {
        this.paginaActual = nuevaPagina;
        setTimeout(() => doScroll(), 0);
      }
    }
  }

  get productosFiltrados(): CamisetaProducto[] {
    let filtrados = this.productos.filter(producto => {
      const searchLower = this.busqueda.toLowerCase();
      const searchString = `${producto.team} ${producto.season} ${producto.brand} ${producto.year} ${producto.customization?.playerName || ''}`.toLowerCase();
      const matchesSearch = searchString.includes(searchLower);
      
      const isRetro = producto.year <= 2010 || producto.badge === 'Vintage' || producto.badge === 'Mundialista';
      const matchesTipo = this.marcaActiva === 'All' || (this.marcaActiva === 'Retro' && isRetro);

      const matchesLiga = this.ligaActiva === 'Todas' || producto.league === this.ligaActiva;
      
      const matchesSeleccion = this.seleccionActiva === 'Todas' || 
                               (producto.league === 'Selecciones' && producto.team === this.seleccionActiva);
      
      const matchesCategoria = this.categoriaActiva === 'Todas' || 
                               (this.categoriaActiva === 'Camisetas' && producto.category === 'Camiseta') ||
                               (this.categoriaActiva === 'Conjuntos' && producto.category === 'Conjunto');

      return matchesSearch && matchesTipo && matchesLiga && matchesSeleccion && matchesCategoria;
    });

    if (this.ordenActivo === 'Mayor Precio') {
      filtrados.sort((a, b) => b.price - a.price);
    } else if (this.ordenActivo === 'Menor Precio') {
      filtrados.sort((a, b) => a.price - b.price);
    }
    
    return filtrados;
  }
}
