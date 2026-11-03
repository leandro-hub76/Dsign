import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';
import Button from './Button';

type Props = {
  total: number;
  lastResult: string | null;
  onBack: () => void;
  onStart: () => void;
};

export default function LessonIntro({ total, lastResult, onBack, onStart }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={onBack}>
          <Ionicons name="chevron-back" size={18} color={theme.colors.text} />
        </Pressable>
        <Text style={styles.title}>Color</Text>
        <View style={styles.back} />
      </View>

      <View style={styles.body}>
        <View style={styles.hero}>
          <View style={styles.heroBox}>
            <Image source={require('../../assets/images/color-wheel.png')} style={styles.wheel} />
          </View>
        </View>

        <Text style={styles.name}>Teoría del Color</Text>
        <Text style={styles.description}>
          El color no es decoración, es comunicación. Aprende a usarlo para guiar la atención y crear
          sensaciones concretas.
        </Text>

        <View style={styles.chips}>
          <View style={styles.chip}>
            <Ionicons name="time-outline" size={14} color={theme.colors.text} />
            <Text style={styles.chipText}>5-8 min</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{total} preguntas</Text>
          </View>
        </View>

        {lastResult && <Text style={styles.last}>Tu último resultado: {lastResult}</Text>}
      </View>

      <Button label="Comenzar lección" onPress={onStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: theme.spacing.lg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  back: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: theme.text.title, fontWeight: 'bold', color: theme.colors.text },
  body: { flex: 1, justifyContent: 'center', gap: theme.spacing.md },
  hero: {
    padding: theme.spacing.xl,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.card,
  },
  heroBox: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.background,
  },
  wheel: { width: 120, height: 120 },
  name: {
    marginTop: theme.spacing.md,
    fontSize: theme.text.title,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.text,
  },
  description: {
    fontSize: theme.text.small,
    lineHeight: 18,
    textAlign: 'center',
    color: theme.colors.textSecondary,
  },
  chips: { alignItems: 'center', gap: theme.spacing.sm, marginTop: theme.spacing.md },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.card,
  },
  chipText: { fontSize: theme.text.small, fontWeight: '600', color: theme.colors.text },
  last: { textAlign: 'center', fontSize: theme.text.small, color: theme.colors.textSecondary },
});