import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'tmb-task-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, A11yModule],
  templateUrl: './task-details-dialog.component.html',
  styleUrls: ['./task-details-dialog.component.scss'],
})
export class TaskDetailsDialogComponent {}
