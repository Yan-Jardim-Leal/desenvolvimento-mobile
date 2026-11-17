import { AppStack, stackOptions } from './AppStack';
import { RoleTabs, TabConfig } from './RoleTabs';
import { useUnreadAlerts } from '../hooks/useUnreadAlerts';
import { FieldsScreen } from '../screens/fields/FieldsScreen';
import { FieldDashboardScreen } from '../screens/fields/FieldDashboardScreen';
import { ParcelScreen } from '../screens/fields/ParcelScreen';
import { StatisticsScreen } from '../screens/fields/StatisticsScreen';
import { TasksScreen } from '../screens/farmer/TasksScreen';
import { NewTaskScreen } from '../screens/farmer/NewTaskScreen';
import { TeamScreen } from '../screens/farmer/TeamScreen';
import { NewPlantationScreen } from '../screens/farmer/NewPlantationScreen';
import { CropTypesScreen } from '../screens/farmer/CropTypesScreen';
import { AlertsScreen } from '../screens/account/AlertsScreen';
import { ProfileScreen } from '../screens/account/ProfileScreen';
import { EditProfileScreen } from '../screens/account/EditProfileScreen';

export function FarmerNavigator() {
  const unread = useUnreadAlerts();
  const tabs: TabConfig[] = [
    { name: 'Fields', title: 'Campos', icon: 'map-outline', component: FieldsScreen },
    { name: 'Tasks', title: 'Tarefas', icon: 'clipboard-check-outline', component: TasksScreen },
    { name: 'Team', title: 'Equipa', icon: 'account-group-outline', component: TeamScreen },
    { name: 'Alerts', title: 'Alertas', icon: 'bell-outline', component: AlertsScreen, badge: unread },
    { name: 'Profile', title: 'Perfil', icon: 'account-outline', component: ProfileScreen },
  ];

  return (
    <AppStack.Navigator screenOptions={stackOptions}>
      <AppStack.Screen name="Tabs">{() => <RoleTabs tabs={tabs} />}</AppStack.Screen>
      <AppStack.Screen name="FieldDashboard" component={FieldDashboardScreen} />
      <AppStack.Screen name="Parcel" component={ParcelScreen} />
      <AppStack.Screen name="Statistics" component={StatisticsScreen} />
      <AppStack.Screen name="NewTask" component={NewTaskScreen} />
      <AppStack.Screen name="NewPlantation" component={NewPlantationScreen} />
      <AppStack.Screen name="CropTypes" component={CropTypesScreen} />
      <AppStack.Screen name="EditProfile" component={EditProfileScreen} />
    </AppStack.Navigator>
  );
}
