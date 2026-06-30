import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto.interface';
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
  producto?: Producto;
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
        if (prod) {
          this.mainImage = prod.image;
        }
      });
    }
  }

  volver() {
    this.location.back();
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  setMainImage(imgUrl: string) {
    this.mainImage = imgUrl;
  }
}
