import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

export type AuthMode = 'login' | 'register';

type Props = { mode: AuthMode; onChange: (mode: AuthMode) => void };

const tabs: { id: AuthMode; label: string }[] = [
  { id: 'login', label: 'Iniciar sesión' },
  { id: 'register', label: 'Registrarse' },
];

export default function AuthTabs({ mode, onChange }: Props) {
  return (
    <View style={styles.bar}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.id}
          style={[styles.tab, tab.id === mode && styles.tabActive]}
          onPress={() => onChange(tab.id)}
        >
          <Text style={styles.label}>{tab.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.full,
  },
  tabActive: { backgroundColor: theme.colors.primarySoft },
  label: { fontSize: theme.text.body, color: '#FFFFFF' },
});