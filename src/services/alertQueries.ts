import { AppState } from '../types/models';

export const alertsOfUser = (state: AppState, userId: string) => state.alerts.filter((alert) => alert.userId === userId);

export const unreadCount = (state: AppState, userId: string) => alertsOfUser(state, userId).filter((alert) => !alert.read).length;
