import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from '../constants/theme';

type Props = { current: number; total: number; hearts: number; onClose: () => void };

export default function QuizHeader({ current, total, hearts, onClose }: Props) {
  const segments = Array.from({ length: total }, (_, index) => index);
  const lives = Array.from({ length: hearts }, (_, index) => index);

  return (
    <View style={styles.header}>
      <Pressable style={styles.close} onPress={onClose}>
        <Ionicons name="close" size={18} color={theme.colors.text} />
      </Pressable>

      <View style={styles.progress}>
        {segments.map((index) => (
          <View key={index} style={[styles.segment, index <= current && styles.segmentDone]} />
        ))}
      </View>

      <View style={styles.hearts}>
        {lives.map((index) => (
          <Ionicons key={index} name="heart" size={12} color="#FFFFFF" />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },
  close: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: { flex: 1, flexDirection: 'row', gap: 6 },
  segment: { flex: 1, height: 6, borderRadius: 3, backgroundColor: theme.colors.track },
  segmentDone: { backgroundColor: theme.colors.primary },
  hearts: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingVertical: 8,
    paddingHorizontal: theme.spacing.xs,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
  },
});