
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarActiveTintColor: '#4ADE80',
        tabBarInactiveTintColor: '#3A4A3C',

        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          borderWidth: 2,
          borderColor: '#3A4A3C',
          borderRadius: 22,
          height: 68,
          marginHorizontal: 4,
          marginBottom: 6,
          padding: 2,
          elevation: 0,
          shadowOpacity: 0,
        },

        tabBarItemStyle: {
          borderRadius: 15,
          overflow: 'hidden',
          marginHorizontal: 1,
          marginVertical: 1,
        },

        tabBarActiveBackgroundColor: '#7FA687',
        tabBarInactiveBackgroundColor: 'rgba(127, 166, 135, 0.1)',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={color}
              style={
                focused
                  ? {
                      borderColor: '#4ADE80',
                      borderWidth: 1,
                      borderRadius: 15,
                    }
                  : undefined
              }
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
