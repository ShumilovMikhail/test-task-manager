import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

import { TaskDTO, TaskEntity } from '../models/tasks.models';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly http = inject(HttpClient);
  private readonly url: string = 'assets/tasks.json';
  private readonly tasksSubject = new BehaviorSubject<TaskEntity[] | null>(null);
  public readonly tasks$: Observable<TaskEntity[] | null> = this.tasksSubject.asObservable();

  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {
    this.http.get<TaskDTO[] | null>(this.url).pipe(
      catchError(err => {
        console.error('Failed to load tasks', err);
        this.tasksSubject.next(null);
        return of(null);
      }),
      map((tasks: TaskDTO[] | null): TaskEntity[] | null => {
        return tasks ? tasks.map(task => ({...task, deadline: new Date(task.deadline)})) : null
      })
      ).subscribe(tasks => {
        this.tasksSubject.next(tasks);
    });
  }
}
