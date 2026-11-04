import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Switch, Text } from 'react-native';
import { theme } from '../constants/theme';

export type RowProps = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  showChevron?: boolean;
  onPress?: () => void;
  isLast?: boolean;
};

export default function SettingsRow({
  icon,
  label,
  value,
  switchValue,
  onSwitchChange,
  showChevron = true,
  onPress,
  isLast,
}: RowProps) {
  const hasSwitch = onSwitchChange !== undefined;

  return (
    <Pressable
      style={[styles.row, !isLast && styles.divider]}
      onPress={onPress}
      disabled={hasSwitch || onPress === undefined}
    >
      <Ionicons name={icon} size={20} color={theme.colors.text} />
      <Text style={styles.label}>{label}</Text>

      {value && <Text style={styles.value}>{value}</Text>}

      {hasSwitch && (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: theme.colors.track, true: theme.colors.primary }}
          thumbColor="#FFFFFF"
        />
      )}

      {!hasSwitch && showChevron && (
        <Ionicons name="chevron-forward" size={16} color={theme.colors.text} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  divider: { borderBottomWidth: 1, borderBottomColor: theme.colors.divider },
  label: { flex: 1, fontSize: theme.text.body, fontWeight: '600', color: theme.colors.text },
  value: { fontSize: theme.text.caption, color: theme.colors.textSecondary },
});