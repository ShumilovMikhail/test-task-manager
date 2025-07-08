import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('@tasks/components/task-list-container/task-list-container.component').then((c) => c.TaskListContainerComponent),
  },
];
