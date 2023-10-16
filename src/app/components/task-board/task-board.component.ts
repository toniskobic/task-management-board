import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';
import { StorageSchema } from 'src/app/models/storage-schema.model';
import { Task, TaskStatus } from 'src/app/models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskCategoryComponent } from '../task-category/task-category.component';
import { UtilsService } from 'src/app/services/utils.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { DIALOG_WIDTH } from 'src/app/constants/constants';
import { A11yModule } from '@angular/cdk/a11y';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

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
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    EditTaskComponent,
    A11yModule,
  ],
})
export class TaskBoardComponent implements OnInit, OnDestroy {
  TaskStatus = TaskStatus;

  private destroy$ = new Subject<void>();

  inputFilterControl = new FormControl<string>('', { nonNullable: true });

  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  get filterInputDirty() {
    return this.inputFilterControl.value.length > 0;
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
    this.utilsService.initSvgIcons(['add', 'close']);
  }

  ngOnInit() {
    this.storage
      .getItemObservable('tasks')
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => {
        this.tasks = tasks || [];
        this.filterTasks(this.inputFilterControl.value.trim());
      });

    this.inputFilterControl.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(0), distinctUntilChanged())
      .subscribe((value) => this.filterTasks(value.trim()));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clearFilter() {
    this.inputFilterControl.reset();
    this.filterTasks(this.inputFilterControl.value);
  }

  addTask() {
    this.dialog.open(EditTaskComponent, {
      width: DIALOG_WIDTH,
      data: { isEdit: false },
      disableClose: true,
    });
  }

  private filterTasks(value: string) {
    this.filteredTasks = !value
      ? this.tasks
      : this.tasks.filter((task) =>
          task.title
            .concat(task.assignee)
            .toLocaleUpperCase()
            .includes(value.toLocaleUpperCase())
        );
  }
}
