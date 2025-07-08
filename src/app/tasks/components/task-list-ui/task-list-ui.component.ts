import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, input, output, viewChild } from '@angular/core';

import { DriveStep } from 'driver.js';
import { TruncatePipe } from 'app/shared/pipes/truncate.pipe';

export interface TaskVM {
  id: number
  title: string;
  status: 'done' | 'in_progress';
  deadline: Date;
}

@Component({
  selector: 'app-task-list-ui',
  imports: [CommonModule, TruncatePipe],
  templateUrl: './task-list-ui.component.html',
  styleUrl: './task-list-ui.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListUiComponent implements AfterViewInit  {
  public readonly tasks = input.required<TaskVM[]>();
  public readonly registerStep = output<DriveStep>();
  private readonly taskElement = viewChild<ElementRef>('taskElement');
  public readonly selectTask = output<number>();

  ngAfterViewInit(): void {
    const taskElement = this.taskElement();
    if(taskElement) {
      this.registerStep.emit({
        element: taskElement.nativeElement,
        popover: { title: 'Открытие деталей задачи', description: 'Кликните на задачу, чтобы посмотреть подробную информацию, изменить статус или добавить комментарии.' }
      });
    }
  }

  public onSelectTask(id: number): void {
    this.selectTask.emit(id)
  }
}
