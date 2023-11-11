import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { A11yModule } from '@angular/cdk/a11y';
import { Task } from 'src/app/models/task.model';
import {
  TASK_STATUS_LABELS,
  TASK_PRIORITY_LABELS,
} from 'src/app/constants/constants';
import { MomentDatePipe } from 'src/app/pipes/moment-date.pipe';

@Component({
  selector: 'tmb-task-details-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    A11yModule,
    MomentDatePipe,
  ],
  templateUrl: './task-details-dialog.component.html',
  styleUrls: ['./task-details-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailsDialogComponent {
  statusLabels = TASK_STATUS_LABELS;
  priorityLabels = TASK_PRIORITY_LABELS;

  task: Task;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { task: Task }) {
    this.task = data.task;
  }
}
