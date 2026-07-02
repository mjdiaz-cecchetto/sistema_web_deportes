import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './client/components/toast/toast.component';
import { CarritoComprasComponent } from './client/components/carrito-compras/carrito-compras.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent, CarritoComprasComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('sistema-web-deportes');
}
