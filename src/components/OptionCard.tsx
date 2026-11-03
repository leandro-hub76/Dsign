import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

export type OptionState = 'idle' | 'selected' | 'correct' | 'wrong';

type Props = {
  letter: string;
  label?: string;
  swatches?: string[];
  variant?: 'row' | 'tile';
  state: OptionState;
  disabled: boolean;
  onPress: () => void;
};

export default function OptionCard({
  letter,
  label,
  swatches,
  variant = 'row',
  state,
  disabled,
  onPress,
}: Props) {
  const isTile = variant === 'tile';

  const badge = (
    <View style={[styles.badge, isTile && styles.badgeSmall]}>
      <Text style={[styles.letter, isTile && styles.letterSmall]}>{letter}</Text>
    </View>
  );

  const colorsRow = swatches && (
    <View style={styles.swatches}>
      {swatches.map((color, index) => (
        <View
          key={index}
          style={[styles.swatch, isTile && styles.swatchTile, { backgroundColor: color }]}
        />
      ))}
    </View>
  );

  const icon =
    state === 'correct' ? (
      <Ionicons name="checkmark" size={20} color={theme.colors.success} />
    ) : state === 'wrong' ? (
      <Ionicons name="close" size={20} color={theme.colors.error} />
    ) : null;

  return (
    <Pressable
      style={[styles.base, isTile ? styles.tile : styles.row, styles[state]]}
      onPress={onPress}
      disabled={disabled}
    >
      {isTile ? (
        <>
          {colorsRow}
          <View style={styles.footer}>
            {badge}
            {icon}
          </View>
        </>
      ) : (
        <>
          {badge}
          {colorsRow}
          <Text style={styles.label}>{label}</Text>
          {icon}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: theme.colors.card,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: theme.spacing.xs,
  },
  tile: {
    flexBasis: '45%',
    flexGrow: 1,
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
  },
  // States (the name matches OptionState)
  idle: {},
  selected: { borderColor: theme.colors.primarySoft },
  correct: { borderColor: theme.colors.success, backgroundColor: theme.colors.successSoft },
  wrong: { borderColor: theme.colors.error, backgroundColor: theme.colors.errorSoft },

  badge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeSmall: { width: 26, height: 26, borderRadius: 8 },
  letter: { fontSize: theme.text.body, fontWeight: 'bold', color: '#FFFFFF' },
  letterSmall: { fontSize: theme.text.small },
  swatches: { flexDirection: 'row', gap: 6 },
  swatch: { width: 24, height: 24, borderRadius: 8 },
  swatchTile: { width: 30, height: 30 },
  label: { flex: 1, fontSize: theme.text.body, fontWeight: '600', color: theme.colors.text },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});