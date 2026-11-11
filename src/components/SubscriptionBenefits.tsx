import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

type Benefit = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const benefitRows: Benefit[][] = [
  [
    { id: 'courses', title: 'Cursos ilimitados', description: 'Acceso a +200 lecciones', icon: 'albums-outline' },
    { id: 'ads', title: 'Sin anuncios', description: 'Experiencia limpia', icon: 'ban-outline' },
  ],
  [
    { id: 'challenges', title: 'Retos ilimitados', description: 'Practicar sin límite', icon: 'lock-open-outline' },
    { id: 'progress', title: 'Progreso detallado', description: 'Estadísticas detalladas', icon: 'reload-outline' },
  ],
];

export default function SubscriptionBenefits() {
  return (
    <View style={styles.grid}>
      {benefitRows.map((row, index) => (
        <View key={index} style={styles.row}>
          {row.map((benefit) => (
            <View key={benefit.id} style={styles.card}>
              <Ionicons name={benefit.icon} size={theme.text.display} color={theme.colors.text} />
              <Text style={styles.title}>{benefit.title}</Text>
              <Text style={styles.description}>{benefit.description}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { gap: theme.spacing.md },
  row: { flexDirection: 'row', gap: theme.spacing.md },
  card: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  title: { fontSize: theme.text.body, fontWeight: 'bold', color: theme.colors.text },
  description: { fontSize: theme.text.caption, color: theme.colors.primary },
});