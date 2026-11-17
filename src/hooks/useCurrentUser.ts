import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { findUser } from '../services/userQueries';

export const useCurrentUser = () => {
  const { userId } = useAuth();
  const { state } = useData();
  const user = findUser(state, userId);
  if (!user) throw new Error('Sem sessão iniciada');
  return user;
};
