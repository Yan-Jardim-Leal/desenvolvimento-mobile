import { ComponentType } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconName } from '../components/ui';
import { colors } from '../theme';

export interface TabConfig {
  name: string;
  title: string;
  icon: IconName;
  component: ComponentType;
  badge?: number;
}

const Tab = createBottomTabNavigator();

export function RoleTabs({ tabs }: { tabs: TabConfig[] }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
      }}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            title: tab.title,
            tabBarBadge: tab.badge || undefined,
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name={tab.icon} color={color} size={size} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
