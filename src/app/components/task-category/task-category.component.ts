import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'tmb-task-category',
  standalone: true,
  templateUrl: './task-category.component.html',
  styleUrls: ['./task-category.component.scss'],
  imports: [CommonModule, TaskCardComponent, MatButtonModule, MatIconModule],
})
export class TaskCategoryComponent {
  @Input() title: string = '';
  @Input() tasks: Task[] = [];
}
