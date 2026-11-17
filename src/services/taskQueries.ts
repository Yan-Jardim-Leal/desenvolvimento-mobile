import { AppState, Task } from '../types/models';
import { diffInDays, formatRelativeDay } from '../utils/date';
import { findField, findParcel } from './fieldQueries';

export type TaskFilter = 'all' | 'pending' | 'done';

export interface TaskSection {
  title: string;
  data: Task[];
}

export const findTask = (state: AppState, taskId: string) => state.tasks.find((task) => task.id === taskId);

export const tasksOfOperator = (state: AppState, operatorId: string) => state.tasks.filter((task) => task.operatorId === operatorId);

export const tasksOfParcel = (state: AppState, parcelId: string) => state.tasks.filter((task) => task.parcelId === parcelId);

export const tasksOfCompany = (state: AppState, companyId: string | null) =>
  state.tasks.filter((task) => findField(state, task.fieldId)?.companyId === companyId);

export const isOpen = (task: Task) => task.status !== 'done';

export const filterTasks = (tasks: Task[], filter: TaskFilter) => {
  if (filter === 'pending') return tasks.filter(isOpen);
  if (filter === 'done') return tasks.filter((task) => !isOpen(task));
  return tasks;
};

const sectionOf = (task: Task) => {
  const diff = diffInDays(task.dueDate);
  if (diff === 0) return 'Hoje';
  if (diff > 0 && diff <= 7) return 'Esta semana';
  if (diff > 7) return 'Mais tarde';
  return 'Anteriores';
};

const SECTION_ORDER = ['Hoje', 'Esta semana', 'Mais tarde', 'Anteriores'];

export const groupTasks = (tasks: Task[]): TaskSection[] => {
  const sorted = [...tasks].sort((a, b) => `${a.dueDate}${a.dueTime}`.localeCompare(`${b.dueDate}${b.dueTime}`));
  return SECTION_ORDER.map((title) => ({ title, data: sorted.filter((task) => sectionOf(task) === title) })).filter(
    (section) => section.data.length > 0,
  );
};

export const countByStatus = (tasks: Task[]) => ({
  pending: tasks.filter((task) => task.status === 'pending').length,
  inProgress: tasks.filter((task) => task.status === 'in_progress').length,
  doneToday: tasks.filter((task) => task.status === 'done' && task.completedAt && diffInDays(task.completedAt) === 0).length,
});

export const taskLocation = (state: AppState, task: Task) => {
  const fieldName = findField(state, task.fieldId)?.name ?? '';
  const parcel = findParcel(state, task.parcelId);
  return parcel ? `${fieldName} · ${parcel.code}` : `${fieldName} · campo inteiro`;
};

export const dueLabel = (task: Task) =>
  diffInDays(task.dueDate) === 0 ? `até ${task.dueTime}` : `${formatRelativeDay(task.dueDate)}, ${task.dueTime}`;
