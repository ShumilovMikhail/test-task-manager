import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, input, output, viewChild } from '@angular/core';

import { DriveStep } from "driver.js";

export type StatusFilter = 'all' | 'in_progress' | 'done'

@Component({
  selector: 'app-task-list-filters-ui',
  imports: [],
  templateUrl: './task-list-filters-ui.component.html',
  styleUrl: './task-list-filters-ui.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListFiltersUiComponent implements AfterViewInit {
  public readonly statusFilter = input<StatusFilter>('all')
  public readonly statusFilterChange = output<StatusFilter>();
  public readonly registerStep = output<DriveStep>();
  private readonly filtersElement = viewChild<ElementRef>('filtersElement');

  ngAfterViewInit() {
    const filtersElement = this.filtersElement();
    if(filtersElement) {
      this.registerStep.emit({
        element: filtersElement.nativeElement,
        popover: { title: 'Фильтрация списка', description: 'Используйте этот фильтр, чтобы отобразить только задачи с выбранным статусом — например, выполненные или в работе.' }
      });
    }
  }

  public onStatusFilterChanged(event: Event): void {
    const value = (event.target as HTMLInputElement).value as StatusFilter;
    this.statusFilterChange.emit(value);
  }
}
