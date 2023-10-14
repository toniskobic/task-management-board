import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { DATETIME_FORMAT } from 'src/app/constants/constants';
import { MatButtonModule } from '@angular/material/button';

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
    NgxMatMomentModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
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
  form: FormGroup<{ dueDate: FormControl<moment.Moment | null> }>;
  constructor() {
    this.form = new FormGroup({
      dueDate: new FormControl(moment()),
    });
  }
}
