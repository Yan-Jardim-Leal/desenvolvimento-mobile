import { Tone } from '../theme';
import { PlantStatus, Role, TaskStatus } from '../types/models';

export const roleLabel: Record<Role, string> = { admin: 'Administrador', farmer: 'Agricultor', operator: 'Operador' };

export const roleTone: Record<Role, Tone> = { admin: 'earth', farmer: 'success', operator: 'info' };

export const taskStatusLabel: Record<TaskStatus, string> = { pending: 'Pendente', in_progress: 'Em curso', done: 'Concluída' };

export const taskStatusTone: Record<TaskStatus, Tone> = { pending: 'warning', in_progress: 'info', done: 'success' };

export const plantStatusTone = (status: PlantStatus | 'Pousio'): Tone => {
  if (status === 'Semeada') return 'info';
  if (status === 'Floração' || status === 'Pronta') return 'warning';
  if (status === 'Pousio') return 'neutral';
  return 'success';
};

const KNOWN_CROP_COLORS: Record<string, string> = {
  Batata: '#E0B44C',
  Cebola: '#8E6BBF',
  Cenoura: '#E07B3C',
  Alface: '#5BA35B',
  Tomate: '#C94F4F',
  'Em pousio': '#C9C4B5',
};

export const cropColor = (cropName: string) => KNOWN_CROP_COLORS[cropName] ?? '#3C8FC9';

export const taskIcon = (type: string) => {
  if (type === 'Regar') return 'water-outline';
  if (type === 'Semear') return 'seed-outline';
  if (type === 'Colher') return 'basket-outline';
  if (type === 'Colocar adubo') return 'sprout-outline';
  return 'clipboard-check-outline';
};
