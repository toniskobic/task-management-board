import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
} from '@angular/core';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';
import { StorageSchema } from 'src/app/models/storage-schema.model';
import { TaskPriority, TaskStatus } from 'src/app/models/task.model';
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
import { map } from 'rxjs';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskBoardComponent {
  TaskStatus = TaskStatus;
  taskPriorities = this.utils.getEnumNumberValues(TaskPriority);
  priorityLabels = TASK_PRIORITY_LABELS;

  titleFilterControl = new FormControl<string>('', {
    nonNullable: true,
  });
  assigneeFilterControl = new FormControl<string>('', {
    nonNullable: true,
  });
  prioritiesFilterControl = new FormControl<number[]>([1, 2, 3], {
    nonNullable: true,
  });

  titleFilter = this.utils.toSignalFromControl(this.titleFilterControl);

  assigneeFilter = this.utils.toSignalFromControl(this.assigneeFilterControl);

  prioritiesFilter = this.utils.toSignalFromControl(
    this.prioritiesFilterControl
  );

  tasks = toSignal(
    this.storage.getItemObservable('tasks').pipe(
      takeUntilDestroyed(this.destroyRef),
      map((tasks) => tasks || [])
    ),
    { requireSync: true }
  );

  filteredTasks = computed(this.computeFilteredTasks.bind(this));

  titleFilterActive = computed(() => !!this.titleFilter().length);

  assigneeFilterActive = computed(() => !!this.assigneeFilter().length);

  prioritiesFilterActive = computed(() => this.prioritiesFilter().length < 3);

  toDoTasks = computed(() =>
    this.filteredTasks()?.filter((task) => task.status === TaskStatus.ToDo)
  );

  inProgressTasks = computed(() =>
    this.filteredTasks().filter((task) => task.status === TaskStatus.InProgress)
  );

  completedTasks = computed(() =>
    this.filteredTasks().filter((task) => task.status === TaskStatus.Completed)
  );

  constructor(
    private destroyRef: DestroyRef,
    private storage: StorageService<StorageSchema>,
    private utils: UtilsService,
    private dialog: MatDialog
  ) {
    this.utils.initSvgIcons(['add', 'close', 'reset']);
  }

  clearFilters(
    titleFilter: boolean = true,
    assigneeFilter: boolean = true,
    prioritiesFilter: boolean = true
  ) {
    if (titleFilter) this.titleFilterControl.reset();
    if (assigneeFilter) this.assigneeFilterControl.reset();
    if (prioritiesFilter) this.prioritiesFilterControl.reset([1, 2, 3]);
  }

  addTask() {
    this.dialog.open(EditTaskDialogComponent, {
      width: DIALOG_WIDTH,
      data: { isEdit: false },
      disableClose: true,
    });
  }

  private computeFilteredTasks() {
    const tasks = this.tasks();
    const titleFilter = this.titleFilter().trim();
    const assigneeFilter = this.assigneeFilter().trim();
    const prioritiesFilter = this.prioritiesFilter();

    if (!titleFilter && !assigneeFilter && prioritiesFilter.length === 3) {
      return tasks;
    }

    return tasks?.filter((task) => {
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
