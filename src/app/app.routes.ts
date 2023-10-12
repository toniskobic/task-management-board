import { Routes } from '@angular/router';
import { TaskBoardComponent } from './components/task-board/task-board.component';

export const routes: Routes = [
  { path: '', component: TaskBoardComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
