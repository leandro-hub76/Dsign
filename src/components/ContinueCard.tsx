import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';
import Button from './Button';

type Props = {
  symbol: string;
  number: number;
  topic: string;
  title: string;
  minutes: number;
  onContinue: () => void;
};

export default function ContinueCard({
  symbol,
  number,
  topic,
  title,
  minutes,
  onContinue,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={styles.icon}>
          <Text style={styles.symbol}>{symbol}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.meta}>
            Lección {number} · {topic}
          </Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.time}>~{minutes} min</Text>
      </View>

      <Button label="Continuar lección" onPress={onContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.card,
  },
  top: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },
  icon: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbol: { fontSize: theme.text.subtitle, color: '#FFFFFF' },
  info: { flex: 1, gap: 2 },
  meta: { fontSize: theme.text.caption, color: theme.colors.textSecondary },
  title: { fontSize: theme.text.subtitle, fontWeight: 'bold', color: theme.colors.text },
  time: {
    alignSelf: 'flex-start',
    fontSize: theme.text.caption,
    color: theme.colors.textSecondary,
  },
});