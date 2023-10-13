import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskStatus } from 'src/app/models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StorageService } from 'src/app/services/storage.service';
import { StorageSchema } from 'src/app/models/storage-schema.model';
import { DragDropzoneDirective } from 'src/app/directives/drag-dropzone.directive';

@Component({
  selector: 'tmb-task-category',
  standalone: true,
  templateUrl: './task-category.component.html',
  styleUrls: ['./task-category.component.scss'],
  imports: [
    CommonModule,
    TaskCardComponent,
    MatButtonModule,
    MatIconModule,
    DragDropzoneDirective,
  ],
})
export class TaskCategoryComponent {
  @Input() title: string = '';
  @Input() tasks: Task[] = [];
  @Input() category: TaskStatus = TaskStatus.ToDo;

  constructor(public storage: StorageService<StorageSchema>) {}

  trackByFn(index: number, item: Task): string {
    return item.id;
  }
}
