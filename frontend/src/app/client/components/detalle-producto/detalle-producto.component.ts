import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CamisetaProducto } from '../../interfaces/producto.interface';
import { IconoComponent } from '../icono/icono.component';
import { EncabezadoComponent } from '../encabezado/encabezado.component';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, RouterModule, IconoComponent, EncabezadoComponent],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.scss'
})
export class DetalleProductoComponent implements OnInit {
  producto?: CamisetaProducto;
  selectedSize: string | null = null;
  mainImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0); // Al entrar, siempre arriba
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productoService.obtenerProductoPorId(id).subscribe(prod => {
        this.producto = prod;
        if (prod && prod.images && prod.images.length > 0) {
          const frontImg = prod.images.find(img => img.view === 'front');
          this.mainImage = frontImg ? frontImg.url : prod.images[0].url;
        }
      });
    }
  }

  get displayName(): string {
    if (!this.producto) return '';
    let name = `${this.producto.team} ${this.producto.season} ${this.producto.type}`;
    if (this.producto.customization) {
      name += ` - ${this.producto.customization.playerName} ${this.producto.customization.number}`;
    }
    return name;
  }

  volver() {
    this.location.back();
  }

  selectSize(size: string) {
    const variant = this.producto?.variants.find(v => v.size === size);
    if (variant && variant.stock > 0) {
      this.selectedSize = size;
    }
  }

  setMainImage(imgUrl: string) {
    this.mainImage = imgUrl;
  }
}
