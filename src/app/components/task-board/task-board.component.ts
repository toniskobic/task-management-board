import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';
import { StorageSchema } from 'src/app/models/storage-schema.model';
import { TaskStatus } from 'src/app/models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskCategoryComponent } from '../task-category/task-category.component';
import { UtilsService } from 'src/app/services/utils.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { DIALOG_WIDTH } from 'src/app/constants/constants';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'tmb-task-board',
  standalone: true,
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
  imports: [
    CommonModule,
    TaskCardComponent,
    TaskCategoryComponent,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    EditTaskComponent,
    A11yModule,
  ],
})
export class TaskBoardComponent {
  TaskStatus = TaskStatus;

  constructor(
    private storage: StorageService<StorageSchema>,
    private utilsService: UtilsService,
    private dialog: MatDialog
  ) {
    this.utilsService.initSvgIcons(['add']);
  }

  get tasks() {
        return this.storage.getItem('tasks') || [];
  }

  get toDoTasks() {
    return this.tasks.filter((task) => task.status === TaskStatus.ToDo);
  }
  get inProgressTasks() {
    return this.tasks.filter((task) => task.status === TaskStatus.InProgress);
  }
  get completedTasks() {
    return this.tasks.filter((task) => task.status === TaskStatus.Completed);
  }

  addTask() {
    this.dialog.open(EditTaskComponent, {
      width: DIALOG_WIDTH,
      data: { isEdit: false },
      disableClose: true,
    });
  }
}
