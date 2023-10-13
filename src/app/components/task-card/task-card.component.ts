import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Task } from 'src/app/models/task.model';
import { DraggableDirective } from 'src/app/directives/draggable.directive';

@Component({
  selector: 'tmb-task-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, DraggableDirective],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task: Task = {} as Task;
}
