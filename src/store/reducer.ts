import { AppState } from '../types/models';
import { Action } from './actions';

const updateById = <T extends { id: string }>(items: T[], id: string, changes: Partial<T>) =>
  items.map((item) => (item.id === id ? { ...item, ...changes } : item));

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'user/added':
      return { ...state, users: [...state.users, action.user] };
    case 'user/updated':
      return { ...state, users: updateById(state.users, action.userId, action.changes) };
    case 'company/added':
      return { ...state, companies: [...state.companies, action.company] };
    case 'parcel/added':
      return { ...state, parcels: [...state.parcels, action.parcel] };
    case 'cropType/added':
      return { ...state, cropTypes: [...state.cropTypes, action.cropType] };
    case 'cropType/removed':
      return { ...state, cropTypes: state.cropTypes.filter((cropType) => cropType.id !== action.cropTypeId) };
    case 'plantation/added':
      return { ...state, plantations: [...state.plantations, action.plantation] };
    case 'plantation/updated':
      return { ...state, plantations: updateById(state.plantations, action.plantationId, action.changes) };
    case 'task/added':
      return { ...state, tasks: [...state.tasks, action.task] };
    case 'task/updated':
      return { ...state, tasks: updateById(state.tasks, action.taskId, action.changes) };
    case 'alert/added':
      return { ...state, alerts: [action.alert, ...state.alerts] };
    case 'alert/read':
      return { ...state, alerts: updateById(state.alerts, action.alertId, { read: true }) };
    default:
      return state;
  }
};
