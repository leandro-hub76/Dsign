import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

const letters = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

type Props = { activity: boolean[] };

export default function WeekCard({ activity }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>XP ESTA SEMANA</Text>

      <View style={styles.row}>
        {letters.map((letter, index) => (
          <View key={index} style={[styles.chip, activity[index] && styles.chipActive]}>
            <Text style={[styles.chipText, activity[index] && styles.chipTextActive]}>
              {letter}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.md,
    padding: theme.spacing.xl,
    borderRadius: 32,
    backgroundColor: theme.colors.primary,
  },
  title: { fontSize: theme.text.body, fontWeight: 'bold', color: '#FFFFFF' },
  row: { flexDirection: 'row', gap: 6 },
  chip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.sand,
  },
  chipActive: { backgroundColor: theme.colors.primarySoft },
  chipText: { fontSize: theme.text.small, color: theme.colors.text },
  chipTextActive: { color: '#FFFFFF' },
});