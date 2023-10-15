import { NgxMatDateFormats } from '@angular-material-components/datetime-picker';
import { TaskStatus } from '../models/task.model';

export const DATETIME_FORMAT: NgxMatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY, HH:mm',
  },
  display: {
    dateInput: 'DD/MM/YYYY, HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMM YYYY',
  },
};

export const DIALOG_WIDTH = '640px';

export const TASK_STATUS_LABELS = ['To Do', 'In Progress', 'Completed'];
