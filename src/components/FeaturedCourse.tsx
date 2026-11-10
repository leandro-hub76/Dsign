import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';
import Button from './Button';

type Props = {
  title: string;
  lessons: number;
  level: string;
  onStart: () => void;
};

export default function FeaturedCourse({ title, lessons, level, onStart }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>MÁS POPULAR</Text>
      </View>

      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.meta}>
          {lessons} lecciones · {level}
        </Text>
      </View>

      <Button label="Comenzar gratis" onPress={onStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.sm,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.card,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: theme.spacing.xs,
    borderRadius: 6,
    backgroundColor: theme.colors.track,
  },
  badgeText: { fontSize: 9, fontWeight: 'bold', color: theme.colors.text },
  texts: { gap: 2 },
  title: { fontSize: theme.text.subtitle, fontWeight: 'bold', color: theme.colors.text },
  meta: { fontSize: theme.text.caption, color: theme.colors.textSecondary },
});