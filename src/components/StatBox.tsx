import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  value: number;
  unit: string;
  label: string;
};

export default function StatBox({ icon, value, unit, label }: Props) {
  return (
    <View style={styles.box}>
      <View style={styles.top}>
        <Ionicons name={icon} size={18} color={theme.colors.gold} />
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>

      <View style={styles.pill}>
        <Text style={styles.pillText}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    gap: theme.spacing.sm,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.sage,
  },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  value: { fontSize: theme.text.title, color: '#FFFFFF' },
  unit: { fontSize: theme.text.small, color: '#FFFFFF' },
  pill: {
    alignItems: 'center',
    paddingVertical: 2,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.sand,
  },
  pillText: { fontSize: theme.text.small, fontWeight: 'bold', color: theme.colors.primary },
});