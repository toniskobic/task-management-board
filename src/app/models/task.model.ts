import { Moment } from 'moment';

export interface TaskBase {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  description: string | null;
}

export interface Task extends TaskBase {
  id: string;
  createdAt: string | null;
  dueDate: string;
}

export interface TaskFormModel extends TaskBase {
  createdAt: Moment | null;
  dueDate: Moment;
}

export enum TaskStatus {
  ToDo = 0,
  InProgress = 1,
  Completed = 2,
}

export enum TaskPriority {
  High = 1,
  Medium = 2,
  Low = 3,
}
