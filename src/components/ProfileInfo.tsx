import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';
import { loadSession, User } from '../storage/data';

export default function ProfileInfo() {
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
    <View style={styles.info}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={32} color="#FFFFFF" />
      </View>

      <View style={styles.tags}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{user ? user.username.toUpperCase() : ''}</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>NIVEL 5</Text>
        </View>
      </View>

      <Pressable style={styles.settings} onPress={() => router.push('/Settings')}>
        <Ionicons name="settings-outline" size={20} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  info: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.lg },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tags: { flex: 1, alignItems: 'flex-start', gap: 4 },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.pill,
  },
  tagText: { fontSize: 10, color: '#FFFFFF' },
  settings: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});