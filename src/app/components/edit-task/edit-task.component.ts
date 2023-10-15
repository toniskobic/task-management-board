import { Component, Inject } from '@angular/core';
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
  TASK_STATUS_LABELS,
} from 'src/app/constants/constants';
import { MatButtonModule } from '@angular/material/button';
import {
  Task,
  TaskOmitId,
  TaskPriority,
  TaskStatus,
} from 'src/app/models/task.model';
import {
  MAT_DIALOG_DATA,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { ModelFormGroup } from 'src/app/models/model-form-group.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'tmb-edit-task',
  standalone: true,
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
  ],
  providers: [
    {
      provide: NgxMatDateAdapter,
      useClass: NgxMatMomentAdapter,
    },
    { provide: NGX_MAT_DATE_FORMATS, useValue: DATETIME_FORMAT },
  ],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent {
  taskStatuses = this.utilsService.getEnumNumberValues(TaskStatus);
  TaskPriority = TaskPriority;
  statusLabels = TASK_STATUS_LABELS;

  form!: ModelFormGroup<TaskOmitId>;

  constructor(
    private utilsService: UtilsService,
    @Inject(MAT_DIALOG_DATA) private data: { task: Task; isEdit: boolean }
  ) {
    this.createForm();
    console.log(this.taskStatuses);
  }

  createForm() {
    this.form = new FormGroup({
      title: new FormControl(this.data.isEdit ? this.data.task.title : '', {
        nonNullable: true,
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
        }
      ),
      description: new FormControl(
        this.data.isEdit ? this.data.task.description : '',
        {
          nonNullable: true,
        }
      ),
      createdAt: new FormControl(
        this.data.isEdit ? this.data.task.createdAt : moment()
      ),
      dueDate: new FormControl(
        this.data.isEdit ? this.data.task.dueDate : moment().add(1, 'hour'),
        {
          nonNullable: true,
        }
      ),
    });
  }
}
