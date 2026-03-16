
export enum WorkflowStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: WorkflowStatus;
  longDescription: string;
}

export interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}
