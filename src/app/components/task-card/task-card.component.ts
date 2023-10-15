import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Task, TaskPriority } from 'src/app/models/task.model';
import { DraggableDirective } from 'src/app/directives/draggable.directive';
import { UtilsService } from 'src/app/services/utils.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { StorageService } from 'src/app/services/storage.service';
import { StorageSchema } from 'src/app/models/storage-schema.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskDetailsDialogComponent } from '../task-details-dialog/task-details-dialog.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'tmb-task-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    DraggableDirective,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
  ],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  TaskPriority = TaskPriority;

  @Input() task: Task = {} as Task;

  constructor(
    private utilsService: UtilsService,
    private storage: StorageService<StorageSchema>,
    private dialog: MatDialog
  ) {
    this.utilsService.initSvgIcons([
      'three-dots-horizontal',
      'view',
      'delete',
      'edit',
    ]);
  }

  moreDetails() {
    this.dialog.open(TaskDetailsDialogComponent, { width: '640px' });
  }

  edit() {
    this.dialog.open(EditTaskComponent, { width: '640px' });
  }

  remove() {
    const tasks = this.storage.getItem('tasks') || [];
    this.storage.setItem(
      'tasks',
      tasks?.filter((task) => task.id !== this.task.id)
    );
  }
}
