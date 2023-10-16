import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';
import { StorageSchema } from 'src/app/models/storage-schema.model';
import { Task, TaskPriority, TaskStatus } from 'src/app/models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskCategoryComponent } from '../task-category/task-category.component';
import { UtilsService } from 'src/app/services/utils.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task-dialog/edit-task-dialog.component';
import {
  DIALOG_WIDTH,
  TASK_PRIORITY_LABELS,
} from 'src/app/constants/constants';
import { A11yModule } from '@angular/cdk/a11y';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';

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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    EditTaskComponent,
    A11yModule,
  ],
})
export class TaskBoardComponent implements OnInit, OnDestroy {
  TaskStatus = TaskStatus;
  taskPriorities = this.utilsService.getEnumNumberValues(TaskPriority);
  priorityLabels = TASK_PRIORITY_LABELS;

  private destroy$ = new Subject<void>();

  titleeAssigneeFilterControl = new FormControl<string>('', {
    nonNullable: true,
  });
  prioritiesFilterControl = new FormControl<number[]>([1, 2, 3], {
    nonNullable: true,
  });

  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  get titleAssigneeFilterActive() {
    return this.titleeAssigneeFilterControl.value.length > 0;
  }

  get prioritiesFilterActive() {
    return this.prioritiesFilterControl.value.length < 3;
  }

  get toDoTasks() {
    return this.filteredTasks.filter((task) => task.status === TaskStatus.ToDo);
  }

  get inProgressTasks() {
    return this.filteredTasks.filter(
      (task) => task.status === TaskStatus.InProgress
    );
  }

  get completedTasks() {
    return this.filteredTasks.filter(
      (task) => task.status === TaskStatus.Completed
    );
  }

  constructor(
    private storage: StorageService<StorageSchema>,
    private utilsService: UtilsService,
    private dialog: MatDialog
  ) {
    this.utilsService.initSvgIcons(['add', 'close', 'reset']);
  }

  ngOnInit() {
    this.storage
      .getItemObservable('tasks')
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => {
        this.tasks = tasks || [];
        this.filterTasks(
          this.titleeAssigneeFilterControl.value.trim(),
          this.prioritiesFilterControl.value
        );
      });

    this.titleeAssigneeFilterControl.valueChanges
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((value) =>
        this.filterTasks(value.trim(), this.prioritiesFilterControl.value)
      );

    this.prioritiesFilterControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.filterTasks(this.titleeAssigneeFilterControl.value, value);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clearFilters(
    titleAssigneeFilter: boolean = true,
    prioritiesFilter: boolean = true
  ) {
    if (titleAssigneeFilter) this.titleeAssigneeFilterControl.reset();
    if (prioritiesFilter) this.prioritiesFilterControl.reset([1, 2, 3]);

    this.filterTasks(
      this.titleeAssigneeFilterControl.value,
      this.prioritiesFilterControl.value
    );
  }

  addTask() {
    this.dialog.open(EditTaskComponent, {
      width: DIALOG_WIDTH,
      data: { isEdit: false },
      disableClose: true,
    });
  }

  private filterTasks(titleAssigneeFilter: string, prioritiesFilter: number[]) {
    if (!titleAssigneeFilter && prioritiesFilter.length === 3) {
      this.filteredTasks = this.tasks;
      return;
    }
    this.filteredTasks = this.tasks.filter((task) => {
      return (
        (!titleAssigneeFilter ||
          task.title
            .concat(task.assignee)
            .toLocaleUpperCase()
            .includes(titleAssigneeFilter.toLocaleUpperCase())) &&
        (prioritiesFilter.length === 3 ||
          prioritiesFilter.includes(task.priority))
      );
    });
  }
}
