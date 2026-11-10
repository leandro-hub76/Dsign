import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AccountCard from '../components/AccountCard';
import SettingsSection from '../components/SettingsSection';
import { theme } from '../constants/theme';
import {
  askNotificationPermission,
  cancelReminder,
  loadReminder,
  scheduleDailyReminder,
} from '../notifications/notifications';

// Time of the daily reminder (24h). For a quick test, set it 2 minutes ahead.
const REMINDER_HOUR = 20;
const REMINDER_MINUTE = 0;

export default function Settings() {
  const [dailyReminder, setDailyReminder] = useState(false);
  const [streakAlerts, setStreakAlerts] = useState(true);
  const [newCourses, setNewCourses] = useState(true);
  const [sounds, setSounds] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function fetchReminder() {
        const saved = await loadReminder();
        setDailyReminder(saved !== null);
      }
      fetchReminder();
    }, [])
  );

  async function handleDailyReminder(value: boolean) {
    if (!value) {
      await cancelReminder();
      setDailyReminder(false);
      return;
    }

    const allowed = await askNotificationPermission();
    if (!allowed) {
      const message =
        Platform.OS === 'web'
          ? 'Las notificaciones no funcionan en el navegador. Pruébalo en tu celular.'
          : 'Activa los permisos de notificaciones para Dsign en los ajustes del celular.';
      Alert.alert('No se pudo activar', message);
      return;
    }

    const reminder = await scheduleDailyReminder(REMINDER_HOUR, REMINDER_MINUTE);
    setDailyReminder(reminder !== null);
  }

  function handleLogout() {
    Alert.alert('Cerrar sesión', '¿Seguro que quieres salir?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cerrar sesión', style: 'destructive', onPress: () => router.replace('/Login') },
    ]);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable style={styles.back} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={18} color={theme.colors.text} />
          </Pressable>
          <Text style={styles.title}>Configuración</Text>
        </View>

        <AccountCard />

        <SettingsSection
          title="CUENTA"
          rows={[
            { id: 'dsign', icon: 'sparkles-outline', label: 'Dsign', onPress: () => {} },
            { id: 'password', icon: 'key-outline', label: 'Cambiar contraseña', onPress: () => {} },
            { id: 'email', icon: 'mail-outline', label: 'Correo electrónico', onPress: () => {} },
          ]}
        />

        <SettingsSection
          title="NOTIFICACIONES"
          rows={[
            {
              id: 'daily',
              icon: 'notifications-outline',
              label: 'Recordatorio diario',
              switchValue: dailyReminder,
              onSwitchChange: handleDailyReminder,
            },
            {
              id: 'streak',
              icon: 'flame-outline',
              label: 'Alertas de racha',
              switchValue: streakAlerts,
              onSwitchChange: setStreakAlerts,
            },
            {
              id: 'courses',
              icon: 'albums-outline',
              label: 'Nuevos cursos',
              switchValue: newCourses,
              onSwitchChange: setNewCourses,
            },
          ]}
        />

        <SettingsSection
          title="PREFERENCIAS"
          rows={[
            { id: 'language', icon: 'globe-outline', label: 'Idioma', value: 'Español', onPress: () => {} },
            {
              id: 'sounds',
              icon: 'volume-medium-outline',
              label: 'Sonidos',
              switchValue: sounds,
              onSwitchChange: setSounds,
            },
          ]}
        />

        <SettingsSection
          title="AYUDA Y SOPORTE"
          rows={[
            { id: 'help', icon: 'help-circle-outline', label: 'Centro de ayuda', onPress: () => {} },
            { id: 'report', icon: 'warning-outline', label: 'Reportar un problema', onPress: () => {} },
            { id: 'terms', icon: 'document-text-outline', label: 'Términos y condiciones', onPress: () => {} },
            { id: 'privacy', icon: 'lock-closed-outline', label: 'Política de privacidad', onPress: () => {} },
          ]}
        />

        <SettingsSection
          title="Sobre la app"
          rows={[{ id: 'about', icon: 'sparkles-outline', label: 'Dsign', value: 'v1.0.0', showChevron: false }]}
        />

        <Pressable style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.xl, gap: theme.spacing.lg },
  header: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },
  back: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: theme.text.title, fontWeight: 'bold', color: theme.colors.text },
  logout: {
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    backgroundColor: theme.colors.danger,
  },
  logoutText: { fontSize: theme.text.body, fontWeight: 'bold', color: '#FFFFFF' },
});