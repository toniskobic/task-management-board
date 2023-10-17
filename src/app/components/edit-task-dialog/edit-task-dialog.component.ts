import { Component, HostListener, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';
import {
  NgxMatMomentModule,
  NgxMatMomentAdapter,
} from '@angular-material-components/moment-adapter';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  NGX_MAT_DATE_FORMATS,
  NgxMatDateAdapter,
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
import * as moment from 'moment';
import {
  DATETIME_FORMAT,
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
} from 'src/app/constants/constants';
import { MatButtonModule } from '@angular/material/button';
import {
  Task,
  TaskFormModel,
  TaskPriority,
  TaskStatus,
} from 'src/app/models/task.model';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ModelFormGroup } from 'src/app/models/model-form-group.model';
import { UtilsService } from 'src/app/services/utils.service';
import { StorageService } from 'src/app/services/storage.service';
import { StorageSchema } from 'src/app/models/storage-schema.model';
import { v4 } from 'uuid';
import { MatErrorComponent } from '../mat-error/mat-error.component';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'tmb-edit-task',
  standalone: true,
  providers: [
    {
      provide: NgxMatDateAdapter,
      useClass: NgxMatMomentAdapter,
    },
    { provide: NGX_MAT_DATE_FORMATS, useValue: DATETIME_FORMAT },
  ],
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    TextFieldModule,
    NgxMatMomentModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatDialogModule,
    MatErrorComponent,
  ],
})
export class EditTaskDialogComponent {
  taskStatuses = this.utilsService.getEnumNumberValues(TaskStatus);
  taskPriorities = this.utilsService.getEnumNumberValues(TaskPriority);
  statusLabels = TASK_STATUS_LABELS;
  priorityLabels = TASK_PRIORITY_LABELS;

  form!: ModelFormGroup<TaskFormModel>;

  constructor(
    private storage: StorageService<StorageSchema>,
    private utilsService: UtilsService,
    private dialog: DialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task; isEdit: boolean }
  ) {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      title: new FormControl(this.data.isEdit ? this.data.task.title : '', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
        ],
      }),
      status: new FormControl(
        this.data.isEdit ? this.data.task.status : TaskStatus.ToDo,
        {
          nonNullable: true,
        }
      ),
      priority: new FormControl(
        this.data.isEdit ? this.data.task.priority : TaskPriority.High,
        {
          nonNullable: true,
        }
      ),
      assignee: new FormControl(
        this.data.isEdit ? this.data.task.assignee : '',
        {
          nonNullable: true,
          validators: [Validators.maxLength(255)],
        }
      ),
      description: new FormControl(
        this.data.isEdit ? this.data.task.description : '',
        {
          nonNullable: true,
          validators: [Validators.maxLength(255)],
        }
      ),
      createdAt: new FormControl({
        value: this.data.isEdit ? moment(this.data.task.createdAt) : null,
        disabled: true,
      }),
      dueDate: new FormControl(
        this.data.isEdit
          ? moment(this.data.task.dueDate)
          : moment().add(1, 'hour'),
        {
          nonNullable: true,
        }
      ),
    });
  }

  save() {
    if (this.form.valid) {
      const task: Task = {
        ...this.data.task,
        ...this.form.value,
        id: this.data.isEdit ? this.data.task.id : v4(),
        createdAt: this.data.isEdit
          ? this.data.task.createdAt
          : moment().format(),
        dueDate: this.form.controls.dueDate.value.format(),
      };

      const tasks = this.storage.getItem('tasks') || [];
      const updatedTasks = this.data.isEdit
        ? tasks.map((t) => (t.id === task.id ? task : t))
        : [...tasks, task];

      this.storage.setItem('tasks', updatedTasks);
      this.dialog.close();
    }
  }

  @HostListener('keydown.esc') close() {
    this.dialog.close();
  }
}
