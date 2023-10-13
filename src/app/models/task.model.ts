export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
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
