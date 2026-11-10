import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

const diamonds = [0, 1, 2, 3, 4];

type Props = { level: number; filled: number };

export default function LevelCard({ level, filled }: Props) {
  return (
    <View style={styles.card}>
      <Ionicons name="shield" size={44} color={theme.colors.sand} />
      <View style={styles.info}>
        <Text style={styles.level}>Nivel {level}</Text>
        <View style={styles.diamonds}>
          {diamonds.map((index) => (
            <Ionicons
              key={index}
              name="diamond"
              size={12}
              color={index < filled ? '#FFFFFF' : theme.colors.primarySoft}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
  },
  info: { gap: theme.spacing.xs },
  level: { fontSize: theme.text.subtitle, color: theme.colors.card },
  diamonds: { flexDirection: 'row', gap: 4 },
});