import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskStatus } from 'src/app/models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StorageService } from 'src/app/services/storage.service';
import { StorageSchema } from 'src/app/models/storage-schema.model';
import { DragDropzoneDirective } from 'src/app/directives/drag-dropzone.directive';
import { UtilsService } from 'src/app/services/utils.service';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCategoryComponent {
  TaskStatus = TaskStatus;

  title = input.required<string>();
  tasks = input.required<Task[]>();
  category = input.required<TaskStatus>();

  constructor(
    private utilsService: UtilsService,
    private storage: StorageService<StorageSchema>
  ) {
    this.utilsService.initSvgIcons(['to-do', 'in-progress', 'check-circle']);
  }

  dropCallback = (event: DragEvent) => {
    const data = event.dataTransfer?.getData('text') || '';
    const allTasks = this.storage.getItem('tasks') || [];
    const task = allTasks.find((task: Task) => task.id === data);

    if (task) {
      task.status = this.category();
      this.storage.setItem('tasks', allTasks);
    }
  };
}
