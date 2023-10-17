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
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import {
  DIALOG_WIDTH,
  TASK_PRIORITY_LABELS,
} from 'src/app/constants/constants';
import { A11yModule } from '@angular/cdk/a11y';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    MatTooltipModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    EditTaskDialogComponent,
    A11yModule,
  ],
})
export class TaskBoardComponent implements OnInit, OnDestroy {
  TaskStatus = TaskStatus;
  taskPriorities = this.utilsService.getEnumNumberValues(TaskPriority);
  priorityLabels = TASK_PRIORITY_LABELS;

  private destroy$ = new Subject<void>();

  titleFilterControl = new FormControl<string>('', {
    nonNullable: true,
  });
  assigneeFilterControl = new FormControl<string>('', {
    nonNullable: true,
  });
  prioritiesFilterControl = new FormControl<number[]>([1, 2, 3], {
    nonNullable: true,
  });

  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  get titleFilterActive() {
    return this.titleFilterControl.value.length > 0;
  }

  get assigneeFilterActive() {
    return this.assigneeFilterControl.value.length > 0;
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
          this.titleFilterControl.value.trim(),
          this.assigneeFilterControl.value.trim(),
          this.prioritiesFilterControl.value
        );
      });

    this.titleFilterControl.valueChanges
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((value) =>
        this.filterTasks(
          value.trim(),
          this.assigneeFilterControl.value,
          this.prioritiesFilterControl.value
        )
      );

    this.assigneeFilterControl.valueChanges
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((value) =>
        this.filterTasks(
          this.titleFilterControl.value,
          value.trim(),
          this.prioritiesFilterControl.value
        )
      );

    this.prioritiesFilterControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.filterTasks(
          this.titleFilterControl.value,
          this.assigneeFilterControl.value,
          value
        );
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clearFilters(
    titleFilter: boolean = true,
    assigneeFilter: boolean = true,
    prioritiesFilter: boolean = true
  ) {
    if (titleFilter) this.titleFilterControl.reset();
    if (assigneeFilter) this.assigneeFilterControl.reset();
    if (prioritiesFilter) this.prioritiesFilterControl.reset([1, 2, 3]);

    this.filterTasks(
      this.titleFilterControl.value,
      this.assigneeFilterControl.value,
      this.prioritiesFilterControl.value
    );
  }

  addTask() {
    this.dialog.open(EditTaskDialogComponent, {
      width: DIALOG_WIDTH,
      data: { isEdit: false },
      disableClose: true,
    });
  }

  private filterTasks(
    titleFilter: string,
    assigneeFilter: string,
    prioritiesFilter: number[]
  ) {
    if (!titleFilter && !assigneeFilter && prioritiesFilter.length === 3) {
      this.filteredTasks = this.tasks;
      return;
    }
    this.filteredTasks = this.tasks.filter((task) => {
      return (
        (!titleFilter ||
          task.title
            .toLocaleUpperCase()
            .includes(titleFilter.toLocaleUpperCase())) &&
        (!assigneeFilter ||
          task.assignee
            .toLocaleUpperCase()
            .includes(assigneeFilter.toLocaleUpperCase())) &&
        (prioritiesFilter.length === 3 ||
          prioritiesFilter.includes(task.priority))
      );
    });
  }
}
