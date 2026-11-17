export type Role = 'admin' | 'farmer' | 'operator';

export type TaskStatus = 'pending' | 'in_progress' | 'done';

export type TaskType = 'Regar' | 'Colocar adubo' | 'Semear' | 'Colher' | 'Monda manual' | 'Outra';

export type TaskTarget = 'field' | 'parcel' | 'plantation';

export type PlantStatus = 'Semeada' | 'Crescimento' | 'Floração' | 'Pronta';

export type SoilState = 'Seco' | 'Húmido' | 'Encharcado';

export type HarvestState = 'Ainda não' | 'Parcial' | 'Colhida';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: Role;
  companyId: string | null;
  location: string;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  nif: string;
  city: string;
  address: string;
  postalCode: string;
  phone: string;
  code: string;
}

export interface Field {
  id: string;
  companyId: string;
  name: string;
  city: string;
  region: string;
  areaHa: number;
  coordinates: string;
}

export interface Sensors {
  humidity: number;
  temperature: number;
  light: number;
  ph: number;
}

export interface Parcel {
  id: string;
  fieldId: string;
  code: string;
  areaHa: number;
  qrCode: string;
  sensors: Sensors;
}

export interface CropType {
  id: string;
  companyId: string;
  name: string;
  cycleDays: number;
}

export interface Plantation {
  id: string;
  parcelId: string;
  cropTypeId: string;
  plantedAt: string;
  harvestAt: string;
  status: PlantStatus;
  notes: string;
  active: boolean;
}

export interface Task {
  id: string;
  type: TaskType;
  target: TaskTarget;
  fieldId: string;
  parcelId: string | null;
  operatorId: string;
  dueDate: string;
  dueTime: string;
  status: TaskStatus;
  observation: string;
  completedAt: string | null;
}

export interface AppAlert {
  id: string;
  userId: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface AppState {
  users: User[];
  companies: Company[];
  fields: Field[];
  parcels: Parcel[];
  cropTypes: CropType[];
  plantations: Plantation[];
  tasks: Task[];
  alerts: AppAlert[];
}
