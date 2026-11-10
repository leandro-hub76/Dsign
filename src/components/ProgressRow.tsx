import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

type Props = { name: string; progress: number; icon: ReactNode };

export default function ProgressRow({ name, progress, icon }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.icon}>{icon}</View>

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${progress}%` }]} />
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
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.primary,
  },
  icon: { width: 56, alignItems: 'center' },
  info: { flex: 1, gap: theme.spacing.sm },
  name: { fontSize: theme.text.body, color: theme.colors.sand },
  track: { height: 6, borderRadius: 3, backgroundColor: theme.colors.sand },
  fill: { height: 6, borderRadius: 3, backgroundColor: theme.colors.primarySoft },
});