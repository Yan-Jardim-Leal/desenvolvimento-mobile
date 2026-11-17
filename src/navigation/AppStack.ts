import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { AppStackParams } from './types';

export const AppStack = createStackNavigator<AppStackParams>();

export const stackOptions: StackNavigationOptions = { headerShown: false, title: 'FarmIPB', cardStyle: { flex: 1 } };
