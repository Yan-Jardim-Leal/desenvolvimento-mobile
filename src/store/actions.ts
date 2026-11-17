import { AppAlert, Company, CropType, Parcel, Plantation, Task, User } from '../types/models';

export type Action =
  | { type: 'user/added'; user: User }
  | { type: 'user/updated'; userId: string; changes: Partial<User> }
  | { type: 'company/added'; company: Company }
  | { type: 'parcel/added'; parcel: Parcel }
  | { type: 'cropType/added'; cropType: CropType }
  | { type: 'cropType/removed'; cropTypeId: string }
  | { type: 'plantation/added'; plantation: Plantation }
  | { type: 'plantation/updated'; plantationId: string; changes: Partial<Plantation> }
  | { type: 'task/added'; task: Task }
  | { type: 'task/updated'; taskId: string; changes: Partial<Task> }
  | { type: 'alert/added'; alert: AppAlert }
  | { type: 'alert/read'; alertId: string };
