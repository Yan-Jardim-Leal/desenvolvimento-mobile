import { AppState, Role, User } from '../types/models';
import { findCompany } from './companyQueries';

export interface Credentials {
  email: string;
  password: string;
  role: Role;
  companyCode?: string;
}

export type AuthResult = { user: User } | { error: string };

export const authenticate = (state: AppState, credentials: Credentials): AuthResult => {
  const user = state.users.find((candidate) => candidate.email.toLowerCase() === credentials.email.trim().toLowerCase());
  if (!user || user.password !== credentials.password) return { error: 'Email ou palavra-passe incorretos.' };
  if (user.role !== credentials.role) return { error: 'Este utilizador não tem este perfil de acesso.' };
  if (user.role === 'operator' && findCompany(state, user.companyId)?.code !== credentials.companyCode?.trim()) {
    return { error: 'Código da empresa inválido.' };
  }
  return { user };
};
