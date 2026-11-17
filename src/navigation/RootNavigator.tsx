import { ComponentType } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { findUser } from '../services/userQueries';
import { Role } from '../types/models';
import { AuthNavigator } from './AuthNavigator';
import { AdminNavigator } from './AdminNavigator';
import { FarmerNavigator } from './FarmerNavigator';
import { OperatorNavigator } from './OperatorNavigator';

const navigatorsByRole: Record<Role, ComponentType> = {
  admin: AdminNavigator,
  farmer: FarmerNavigator,
  operator: OperatorNavigator,
};

export function RootNavigator() {
  const { userId } = useAuth();
  const { state } = useData();
  const user = findUser(state, userId);
  if (!user) return <AuthNavigator />;
  const RoleNavigator = navigatorsByRole[user.role];
  return <RoleNavigator key={user.id} />;
}
