import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

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

        // El fondo uniforme reproduce el verde de la referencia.
        tabBarActiveBackgroundColor: '#688768',
        tabBarInactiveBackgroundColor: '#688768',

        // El borde verde rodea todo el botón seleccionado.
        tabBarButton: (props) => (
          <Pressable
            {...(props as unknown as React.ComponentProps<typeof Pressable>)}
            style={[
              props.style,
              props.accessibilityState?.selected
                ? styles.activeTabButton
                : styles.tabButton,
            ]}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
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
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeTabButton: {
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#4ADE80',
  },
});
