import { HarvestState, PlantStatus, SoilState, TaskTarget, TaskType } from './models';

export interface AccountDraft {
  name: string;
  email: string;
  password: string;
}

export interface CompanyDraft {
  name: string;
  nif: string;
  postalCode: string;
  address: string;
}

export interface PlantationDraft {
  parcelId: string;
  cropTypeId: string;
  plantedAt: string;
  harvestAt: string;
  notes: string;
}

export interface TaskDraft {
  type: TaskType;
  target: TaskTarget;
  fieldId: string;
  parcelId: string | null;
  operatorId: string;
  dueDate: string;
  dueTime: string;
}

export type PlantStatusOption = PlantStatus | 'Pousio';

export interface CompletionReport {
  soil: SoilState;
  harvest: HarvestState;
  plantStatus: PlantStatusOption;
  harvestAt: string;
  observation: string;
}
