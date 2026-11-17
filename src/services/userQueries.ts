import { AppState, Role, User } from '../types/models';

export const findUser = (state: AppState, userId: string | null) => state.users.find((user) => user.id === userId);

export const usersOfCompany = (state: AppState, companyId: string | null, role?: Role) =>
  state.users.filter((user) => user.companyId === companyId && (!role || user.role === role));

export const nonAdminUsers = (state: AppState) => state.users.filter((user) => user.role !== 'admin');

export const matchesSearch = (user: User, query: string) =>
  `${user.name} ${user.email}`.toLowerCase().includes(query.trim().toLowerCase());
