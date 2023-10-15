import { Moment } from 'moment';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  description: string | null;
  createdAt: Moment | null;
  dueDate: Moment;
}

export type TaskOmitId = Omit<Task, "id">;

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
