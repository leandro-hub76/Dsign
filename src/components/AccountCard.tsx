import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';
import { loadSession, User } from '../storage/data';

export default function AccountCard() {
  const [user, setUser] = useState<User | null>(null);

  useFocusEffect(
    useCallback(() => {
      async function fetchUser() {
        const session = await loadSession();
        setUser(session);
      }
      fetchUser();
    }, [])
  );

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={28} color="#FFFFFF" />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <Pressable>
        <Ionicons name="create-outline" size={20} color={theme.colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.card,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: { flex: 1, gap: 2 },
  name: { fontSize: theme.text.body, fontWeight: 'bold', color: theme.colors.text },
  email: { fontSize: theme.text.caption, color: theme.colors.textSecondary },
});