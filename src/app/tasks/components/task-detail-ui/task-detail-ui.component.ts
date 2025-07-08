import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { NoScrollDirective } from 'app/shared/directives/no-scroll.directive';

export interface TaskVM {
  title: string;
  description: string;
  deadline: Date;
  priority: 'low' | 'medium' | 'high';
}

export const PRIORITY_LABELS = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий'
};

@Component({
  selector: 'app-task-detail-ui',
  imports: [CommonModule,NoScrollDirective],
  templateUrl: './task-detail-ui.component.html',
  styleUrl: './task-detail-ui.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailUiComponent {
  public readonly task = input.required<TaskVM>();
  public readonly close = output<void>();
  protected readonly priorityLabels = PRIORITY_LABELS;

  public onClose(): void {
    this.close.emit()
  }
}
