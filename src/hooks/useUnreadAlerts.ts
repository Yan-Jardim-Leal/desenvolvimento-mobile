import { useData } from '../context/DataContext';
import { unreadCount } from '../services/alertQueries';
import { useCurrentUser } from './useCurrentUser';

export const useUnreadAlerts = () => {
  const { state } = useData();
  const user = useCurrentUser();
  return unreadCount(state, user.id);
};
