import { AppStack, stackOptions } from './AppStack';
import { RoleTabs, TabConfig } from './RoleTabs';
import { useUnreadAlerts } from '../hooks/useUnreadAlerts';
import { MyTasksScreen } from '../screens/operator/MyTasksScreen';
import { ScanQrScreen } from '../screens/operator/ScanQrScreen';
import { ScannedParcelScreen } from '../screens/operator/ScannedParcelScreen';
import { CompleteTaskScreen } from '../screens/operator/CompleteTaskScreen';
import { ObservationScreen } from '../screens/operator/ObservationScreen';
import { AlertsScreen } from '../screens/account/AlertsScreen';
import { ProfileScreen } from '../screens/account/ProfileScreen';
import { EditProfileScreen } from '../screens/account/EditProfileScreen';

export function OperatorNavigator() {
  const unread = useUnreadAlerts();
  const tabs: TabConfig[] = [
    { name: 'MyTasks', title: 'Tarefas', icon: 'clipboard-check-outline', component: MyTasksScreen },
    { name: 'ScanQr', title: 'Ler QR', icon: 'qrcode-scan', component: ScanQrScreen },
    { name: 'Alerts', title: 'Alertas', icon: 'bell-outline', component: AlertsScreen, badge: unread },
    { name: 'Profile', title: 'Perfil', icon: 'account-outline', component: ProfileScreen },
  ];

  return (
    <AppStack.Navigator screenOptions={stackOptions}>
      <AppStack.Screen name="Tabs">{() => <RoleTabs tabs={tabs} />}</AppStack.Screen>
      <AppStack.Screen name="ScannedParcel" component={ScannedParcelScreen} />
      <AppStack.Screen name="CompleteTask" component={CompleteTaskScreen} />
      <AppStack.Screen name="Observation" component={ObservationScreen} />
      <AppStack.Screen name="EditProfile" component={EditProfileScreen} />
    </AppStack.Navigator>
  );
}
