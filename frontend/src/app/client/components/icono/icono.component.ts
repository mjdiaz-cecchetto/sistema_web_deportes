import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icono',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icono.component.html',
  styleUrl: './icono.component.scss'
})
export class IconoComponent {
  @Input() nombre: string = '';
  @Input() size: number = 24;
  @Input() className: string = '';
}
