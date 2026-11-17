import { useCurrentUser } from './useCurrentUser';

export const usePermissions = () => {
  const { role } = useCurrentUser();
  return { canManage: role === 'farmer', isAdmin: role === 'admin', isOperator: role === 'operator' };
};
