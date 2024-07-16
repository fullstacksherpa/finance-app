import {Tabs} from 'expo-router';
import React from 'react';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {MaterialIcons} from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="allocations"
        options={{
          title: 'Allocations',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name='account-tree' color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="accounts"
        options={{
          title: 'Accounts',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name='account-balance-wallet' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
