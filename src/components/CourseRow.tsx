import Ionicons from '@expo/vector-icons/Ionicons';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

type Props = {
  title: string;
  lessons: number;
  level: string;
  icon?: ReactNode;
  onPress?: () => void;
};

export default function CourseRow({ title, lessons, level, icon, onPress }: Props) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.iconBox}>{icon}</View>

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.meta}>
          {lessons} lecciones · {level}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={16} color={theme.colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.card,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: { flex: 1, gap: 2 },
  title: { fontSize: theme.text.subtitle, fontWeight: 'bold', color: theme.colors.text },
  meta: { fontSize: theme.text.caption, color: theme.colors.textSecondary },
});