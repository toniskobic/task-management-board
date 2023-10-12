export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  ToDo = 0,
  InProgress = 1,
  Completed = 2,
}
