import { NgxMatDateFormats } from '@angular-material-components/datetime-picker';
import { TaskPriority, TaskStatus } from '../models/task.model';
import { v4 } from 'uuid';
import moment from 'moment';

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

export const TASK_PRIORITY_LABELS = ['High', 'Medium', 'Low'];

export const DATETIME_OUTPUT_FORMAT = 'DD.MM.YYYY HH:mm';

export function mockTasks() {
  return [
    {
      id: v4(),
      title: 'Create a new project',
      assignee: 'John Doe',
      description: 'Create a new project in Angular',
      status: TaskStatus.ToDo,
      priority: TaskPriority.High,
      createdAt: moment().format(),
      dueDate: moment().add(1, 'days').format(),
    },
    {
      id: v4(),
      title: 'Scaffold the project',
      assignee: 'John Doe',
      description: 'Create a new project in React',
      status: TaskStatus.InProgress,
      priority: TaskPriority.Medium,
      createdAt: moment().format(),
      dueDate: moment().add(2, 'days').format(),
    },
    {
      id: v4(),
      title: 'Conceptualize the project',
      assignee: 'Jane Doe',
      description: 'Conceptualize the project in Angular',
      status: TaskStatus.Completed,
      priority: TaskPriority.Low,
      createdAt: moment().format(),
      dueDate: moment().add(2, 'days').format(),
    },
    {
      id: v4(),
      title: 'Client meeting',
      assignee: 'Matt Doe',
      description: 'Have a meeting with the client',
      status: TaskStatus.ToDo,
      priority: TaskPriority.High,
      createdAt: moment().format(),
      dueDate: moment().add(2, 'days').format(),
    },
  ];
}
