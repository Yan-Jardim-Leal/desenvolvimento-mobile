import { AppStack, stackOptions } from './AppStack';
import { RoleTabs, TabConfig } from './RoleTabs';
import { UsersScreen } from '../screens/admin/UsersScreen';
import { UserDetailScreen } from '../screens/admin/UserDetailScreen';
import { CompaniesScreen } from '../screens/admin/CompaniesScreen';
import { CompanyDetailScreen } from '../screens/admin/CompanyDetailScreen';
import { FieldsScreen } from '../screens/fields/FieldsScreen';
import { FieldDashboardScreen } from '../screens/fields/FieldDashboardScreen';
import { ParcelScreen } from '../screens/fields/ParcelScreen';
import { StatisticsScreen } from '../screens/fields/StatisticsScreen';

const tabs: TabConfig[] = [
  { name: 'Users', title: 'Utilizadores', icon: 'account-multiple-outline', component: UsersScreen },
  { name: 'Companies', title: 'Empresas', icon: 'office-building-outline', component: CompaniesScreen },
  { name: 'Fields', title: 'Campos', icon: 'map-outline', component: FieldsScreen },
];

export function AdminNavigator() {
  return (
    <AppStack.Navigator screenOptions={stackOptions}>
      <AppStack.Screen name="Tabs">{() => <RoleTabs tabs={tabs} />}</AppStack.Screen>
      <AppStack.Screen name="UserDetail" component={UserDetailScreen} />
      <AppStack.Screen name="CompanyDetail" component={CompanyDetailScreen} />
      <AppStack.Screen name="FieldDashboard" component={FieldDashboardScreen} />
      <AppStack.Screen name="Parcel" component={ParcelScreen} />
      <AppStack.Screen name="Statistics" component={StatisticsScreen} />
    </AppStack.Navigator>
  );
}
