import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import {
  DIALOG_WIDTH,
  TASK_PRIORITY_LABELS,
} from 'src/app/constants/constants';
import { A11yModule } from '@angular/cdk/a11y';
import { MomentDatePipe } from 'src/app/pipes/moment-date.pipe';

@Component({
  selector: 'tmb-task-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    DraggableDirective,
    MomentDatePipe,
    A11yModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
  ],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardComponent {
  TaskPriority = TaskPriority;
  priorityLabels = TASK_PRIORITY_LABELS;

  task = input.required<Task>();

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
      'calendar-day-highlighted',
      'person',
    ]);
  }

  moreDetails() {
    this.dialog.open(TaskDetailsDialogComponent, {
      width: DIALOG_WIDTH,
      data: { task: this.task() },
    });
  }

  edit() {
    this.dialog.open(EditTaskDialogComponent, {
      width: DIALOG_WIDTH,
      data: { isEdit: true, task: this.task() },
      disableClose: true,
    });
  }

  remove() {
    const tasks = this.storage.getItem('tasks') || [];
    this.storage.setItem(
      'tasks',
      tasks?.filter((task) => task.id !== this.task().id)
    );
  }
}
