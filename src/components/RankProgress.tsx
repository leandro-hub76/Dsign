import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

const ranks = [
  { id: '1', label: 'COLOR', unlocked: true },
  { id: '2', label: 'TIPO', unlocked: true },
  { id: '3', label: 'UX-UI', unlocked: true },
  { id: '4', label: 'SOON', unlocked: false },
  { id: '5', label: 'SOON', unlocked: false },
  { id: '6', label: 'SOON', unlocked: false },
];

export default function RankProgress() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>PROGRESION DE RANGO</Text>

      <View style={styles.row}>
        {ranks.map((rank) => (
          <View key={rank.id} style={styles.rank}>
            <Ionicons
              name="shield"
              size={32}
              color={rank.unlocked ? theme.colors.gold : theme.colors.locked}
            />
            <Text style={styles.label}>{rank.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.card,
  },
  title: { fontSize: theme.text.caption, fontWeight: 'bold', color: theme.colors.text },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  rank: { alignItems: 'center', gap: theme.spacing.xs },
  label: { fontSize: 10, fontWeight: 'bold', color: theme.colors.text },
});