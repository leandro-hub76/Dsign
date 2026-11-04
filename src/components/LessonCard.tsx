import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '../constants/theme';

type Props = {
  title: string;
  courses?: string;
  icon?: ReactNode;
  onPress?: () => void;
};

export default function LessonCard({ title, courses, icon, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      {icon}
      <Text style={styles.title}>{title}</Text>
      {courses && <Text style={styles.courses}>{courses}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 104,
    gap: theme.spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.primary,
  },
  title: { fontSize: theme.text.subtitle, fontWeight: 'bold', color: '#FFFFFF' },
  courses: { fontSize: theme.text.caption, color: theme.colors.card },
});