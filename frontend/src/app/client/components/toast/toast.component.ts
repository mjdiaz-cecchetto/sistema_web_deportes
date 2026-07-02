import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { IconoComponent } from '../icono/icono.component';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, IconoComponent],
  template: `
    <div class="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 items-center pointer-events-none w-full max-w-sm px-4">
      @for (toast of toastService.toasts(); track toast.id) {
        <div 
          class="pointer-events-auto w-full relative flex items-center p-4 pr-10 mb-3 text-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] font-bold transition-all duration-300 dark:text-white animate-slide-down"
          (touchstart)="onTouchStart($event)"
          (touchend)="onTouchEnd($event, toast.id)"
          [ngClass]="{
            'text-emerald-900 bg-emerald-100 dark:bg-emerald-600 dark:shadow-emerald-600/20': toast.type === 'success',
            'text-rose-900 bg-rose-100 dark:bg-rose-600 dark:shadow-rose-600/20': toast.type === 'error',
            'text-blue-900 bg-blue-100 dark:bg-blue-600 dark:shadow-blue-600/20': toast.type === 'info'
          }"
          role="alert"
        >
          <div class="flex-shrink-0 mr-3">
            @if (toast.type === 'success') {
              <app-icono nombre="check" class="w-5 h-5"></app-icono>
            } @else if (toast.type === 'error') {
              <app-icono nombre="x" class="w-5 h-5"></app-icono>
            } @else {
              <app-icono nombre="info" class="w-5 h-5"></app-icono>
            }
          </div>
          <div>
            {{ toast.message }}
          </div>
          <button type="button" class="absolute top-2 right-2 rounded-lg p-1 hover:bg-black/10 dark:hover:bg-white/10 inline-flex items-center justify-center transition-colors opacity-70 hover:opacity-100" (click)="toastService.remove(toast.id)">
            <app-icono nombre="x" [size]="14"></app-icono>
          </button>
        </div>
      }
    </div>
  `
})
export class ToastComponent {
  toastService = inject(ToastService);

  touchStartX = 0;
  touchStartY = 0;
  touchEndX = 0;
  touchEndY = 0;

  onTouchStart(e: TouchEvent) {
    this.touchStartX = e.changedTouches[0].screenX;
    this.touchStartY = e.changedTouches[0].screenY;
  }

  onTouchEnd(e: TouchEvent, id: number) {
    this.touchEndX = e.changedTouches[0].screenX;
    this.touchEndY = e.changedTouches[0].screenY;
    
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    // Swipe arriba para descartar (más movimiento en Y que en X, hacia arriba)
    if (Math.abs(deltaY) > Math.abs(deltaX) && this.touchStartY - this.touchEndY > 40) {
      this.toastService.remove(id);
    }
  }
}
