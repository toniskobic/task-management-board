import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { StorageSchema } from '../models/storage-schema.model';
import { Task, TaskStatus } from '../models/task.model';

@Directive({
  selector: '[tmbDragDropzone]',
  standalone: true,
})
export class DragDropzoneDirective {
  @Input({ required: true }) category: TaskStatus = TaskStatus.ToDo;

  constructor(
    private el: ElementRef,
    private storage: StorageService<StorageSchema>
  ) {}

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    this.el.nativeElement.classList.remove('active-dropzone');

    const data = event.dataTransfer?.getData('text') || '';
    const allTasks = this.storage.getItem('tasks') || [];
    const task = allTasks.find((task: Task) => task.id === data);

    if (task) {
      task.status = this.category;
      this.storage.setItem('tasks', allTasks);
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
