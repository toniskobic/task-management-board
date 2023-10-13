import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[tmbDraggable]',
  standalone: true,
})
export class DraggableDirective {
  @Input({ required: true }) dragData: string = '';

  @HostBinding('attr.draggable') draggable = true;

  constructor() {}

  @HostListener('dragstart', ['$event']) onDragStart(event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', this.dragData);
      event.dataTransfer.effectAllowed = 'move';
    }
  }
}
