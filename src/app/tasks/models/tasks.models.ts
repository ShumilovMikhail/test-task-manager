export interface TaskDTO {
  id: number;
  title: string;
  description: string;
  status: 'done' | 'in_progress';
  deadline: string;
  priority: 'low' | 'medium' | 'high';
}

export interface TaskEntity {
  id: number;
  title: string;
  description: string;
  status: 'done' | 'in_progress';
  deadline: Date;
  priority: 'low' | 'medium' | 'high';
}
