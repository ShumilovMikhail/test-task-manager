import { TaskEntity } from "@tasks/models/tasks.models";

export type StatusFilter = 'all' | 'in_progress' | 'done'

export const filterTasksByStatus = (tasks: TaskEntity[], status: StatusFilter): TaskEntity[] => {
  if(status === 'all') return tasks;
  return tasks.filter(task => task.status === status);
}
