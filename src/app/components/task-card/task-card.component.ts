import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'tmb-task-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task: Task = {} as Task;
}
