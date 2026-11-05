import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';
import { calculateStreak, loadResults } from '../storage/data';

const hearts = [1, 2, 3, 4, 5];

export default function Header() {
  const [streak, setStreak] = useState(0);

  useFocusEffect(
    useCallback(() => {
      async function fetchStreak() {
        const results = await loadResults();
        setStreak(calculateStreak(results));
      }
      fetchStreak();
    }, [])
  );

  return (
    <View style={styles.header}>
      <View style={styles.brand}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.name}>Dsign</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.pill}>
          <Ionicons name="water" size={20} color="#FFFFFF" />
          <Text style={styles.pillNumber}>{streak}</Text>
        </View>
        <View style={styles.pill}>
          {hearts.map((heart) => (
            <Ionicons key={heart} name="heart" size={16} color="#FFFFFF" />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },
  logo: { width: 40, height: 40, borderRadius: theme.radius.full },
  name: { fontSize: theme.text.title, fontWeight: 'bold', color: theme.colors.primary },
  stats: { flexDirection: 'row', gap: theme.spacing.sm },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 36,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
  },
  pillNumber: { fontSize: theme.text.title, fontWeight: 'bold', color: '#FFFFFF' },
});