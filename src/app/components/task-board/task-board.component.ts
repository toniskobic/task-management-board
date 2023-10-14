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
import { EditTaskComponent } from '../edit-task/edit-task.component';

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
    this.dialog.open(EditTaskComponent, { width: '640px' });
    // const status = Math.floor(Math.random() * 3);
    // const priority = Math.floor(Math.random() * 3) + 1;
    // this.storage.setItem('tasks', [
    //   ...this.tasks,
    //   {
    //     id: v4(),
    //     title: 'Task 1',
    //     description: 'Task 1',
    //     status: status,
    //     priority: priority,
    //     assignee: 'John Doe',
    //     createdAt: moment(),
    //     dueDate: moment().add(1, 'days'),
    //   },
    // ]);
  }
}
