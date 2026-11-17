import { useData } from '../../context/DataContext';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { alertsOfUser, unreadCount } from '../../services/alertQueries';
import { AlertRow } from '../../components/domain';
import { EmptyState, Screen, ScreenHeader } from '../../components/ui';

export function AlertsScreen() {
  const { state, actions } = useData();
  const user = useCurrentUser();
  const alerts = alertsOfUser(state, user.id);

  return (
    <Screen header={<ScreenHeader overline={`${unreadCount(state, user.id)} por ler`} title="Alertas" />}>
      {alerts.map((alert) => (
        <AlertRow key={alert.id} alert={alert} onPress={() => actions.readAlert(alert.id)} />
      ))}
      {alerts.length === 0 && <EmptyState message="Sem alertas." />}
    </Screen>
  );
}
