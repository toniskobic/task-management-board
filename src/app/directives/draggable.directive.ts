import { Directive, HostBinding, HostListener, input } from '@angular/core';

@Directive({
  selector: '[tmbDraggable]',
  standalone: true,
})
export class DraggableDirective {
  dragData = input.required<string>();

  @HostBinding('attr.draggable') draggable = true;

  constructor() {}

  @HostListener('dragstart', ['$event']) onDragStart(event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', this.dragData());
      event.dataTransfer.effectAllowed = 'move';
    }
  }
}
