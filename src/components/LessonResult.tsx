import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';
import Button from './Button';

type Props = { correct: number; total: number; onContinue: () => void };

export default function LessonResult({ correct, total, onContinue }: Props) {
  const percent = Math.round((correct / total) * 100);
  const isPerfect = percent === 100;

  return (
    <View style={styles.container}>
      <View style={styles.trophy}>
        <Text style={styles.trophyEmoji}>🏆</Text>
      </View>

      <View style={styles.texts}>
        <Text style={styles.title}>{isPerfect ? '¡Excelente!' : '¡Sigue así!'}</Text>
        <Text style={styles.subtitle}>
          {isPerfect ? 'Dominaste el tema' : 'La práctica hace al maestro'}
        </Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.ring}>
          <Text style={styles.ringText}>{percent}%</Text>
        </View>
        <View style={styles.statsInfo}>
          <Text style={styles.statsTitle}>{correct}/{total} correctas</Text>
          <Text style={styles.statsCaption}>Teoría del color</Text>
        </View>
      </View>

      <Button label="Continuar" onPress={onContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', gap: theme.spacing.lg },
  trophy: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophyEmoji: { fontSize: 56 },
  texts: { alignItems: 'center', gap: 4 },
  title: { fontSize: theme.text.title, fontWeight: 'bold', color: theme.colors.text },
  subtitle: { fontSize: theme.text.small, color: theme.colors.textSecondary },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.card,
  },
  ring: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.full,
    borderWidth: 3,
    borderColor: theme.colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringText: { fontSize: 11, fontWeight: 'bold', color: theme.colors.success },
  statsInfo: { gap: 2 },
  statsTitle: { fontSize: theme.text.body, fontWeight: 'bold', color: theme.colors.text },
  statsCaption: { fontSize: theme.text.small, color: theme.colors.textSecondary },
});