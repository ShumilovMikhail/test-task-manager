import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { DriveStep } from "driver.js";
import { TasksService } from '@tasks/services/tasks.service';
import { TaskListUiComponent } from '../task-list-ui/task-list-ui.component';
import { TaskListFiltersUiComponent } from '../task-list-filters-ui/task-list-filters-ui.component';
import { filterTasksByStatus, StatusFilter } from './tasks-filters';
import { TaskDetailUiComponent } from '../task-detail-ui/task-detail-ui.component';
import { TaskEntity } from '@tasks/models/tasks.models';
import { TasksTourService } from '@tasks/services/tasks-tour.service';

@Component({
  selector: 'app-task-list-container',
  imports: [CommonModule,TaskListUiComponent, TaskListFiltersUiComponent, TaskDetailUiComponent],
  templateUrl: './task-list-container.component.html',
  styleUrl: './task-list-container.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListContainerComponent {
  private readonly tasksService = inject(TasksService);
  private readonly tasks = toSignal<TaskEntity[] | null>(this.tasksService.tasks$);
  private readonly tasksTourService = inject(TasksTourService);
  protected readonly statusFilter = signal<StatusFilter>('all');
  protected readonly filteredTasks = computed(() => {
    const tasks = this.tasks()
    return tasks ? filterTasksByStatus(tasks,this.statusFilter()) : null
  });
  protected readonly selectedTask = signal<TaskEntity | null>(null);


  public onTaskSelected(id:number): void {
    const task = this.tasks()?.find((task) => task.id === id);
    if(task) this.selectedTask.set(task)
  }

  public onChangeStatusFilter(status: StatusFilter): void {
    this.statusFilter.set(status);
  }

  public onModalClose(): void {
    this.selectedTask.set(null);
  }

  public onRegisterStep(step: DriveStep): void {
    this.tasksTourService.registerStep(step);
  }
}
