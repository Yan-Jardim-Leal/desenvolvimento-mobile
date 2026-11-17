import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParams } from './types';
import { stackOptions } from './AppStack';
import { RoleSelectScreen } from '../screens/auth/RoleSelectScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterUserScreen } from '../screens/auth/RegisterUserScreen';
import { RegisterCompanyScreen } from '../screens/auth/RegisterCompanyScreen';

const Stack = createStackNavigator<AuthStackParams>();

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RegisterUser" component={RegisterUserScreen} />
      <Stack.Screen name="RegisterCompany" component={RegisterCompanyScreen} />
    </Stack.Navigator>
  );
}
