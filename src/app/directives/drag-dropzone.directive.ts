import { Directive, ElementRef, HostListener, input } from '@angular/core';

@Directive({
  selector: '[tmbDragDropzone]',
  standalone: true,
})
export class DragDropzoneDirective {
  dropCallback = input<(event: DragEvent) => void | Promise<void>>();

  constructor(private el: ElementRef) {}

  @HostListener('drop', ['$event']) async onDrop(event: DragEvent) {
    event.preventDefault();
    this.el.nativeElement.classList.remove('active-dropzone');
    const dropCallback = this.dropCallback();
    if (dropCallback) {
      await dropCallback(event);
    }
  }

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  @HostListener('dragenter', ['$event']) onDragEnter() {
    this.el.nativeElement.classList.add('active-dropzone');
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    if (this.el.nativeElement === event.target) {
      this.el.nativeElement.classList.remove('active-dropzone');
    }
  }
}
