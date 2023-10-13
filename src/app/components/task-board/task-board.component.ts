import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';
import { StorageSchema } from 'src/app/models/storage-schema.model';
import { TaskStatus } from 'src/app/models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskCategoryComponent } from '../task-category/task-category.component';

@Component({
  selector: 'tmb-task-board',
  standalone: true,
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
  imports: [CommonModule, TaskCardComponent, TaskCategoryComponent],
})
export class TaskBoardComponent {
  constructor(private storage: StorageService<StorageSchema>) {}

  get tasks() {
    return this.storage.getItem('tasks') || [];
  }

  addTask() {
    this.storage.setItem('tasks', [
      ...this.tasks,
      {
        id: '1',
        title: 'Task 1',
        description: 'Task 1',
        status: TaskStatus.ToDo,
      },
    ]);
  }
}
