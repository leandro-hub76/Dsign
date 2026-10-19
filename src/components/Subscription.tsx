import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';
import Button from './Button';

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

const plans = [
  { id: 'monthly', name: 'Mensual', price: '$4.99' },
  { id: 'yearly', name: 'Anual', price: '$2.99' },
];

export default function Subscription() {
  const [selected, setSelected] = useState('monthly');

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable style={styles.backButton}>
          <Ionicons name="chevron-back" size={theme.text.title} color={theme.colors.text} />
        </Pressable>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <View style={styles.texts}>
          <Text style={styles.title}>Aprende sin límites</Text>
          <Text style={styles.subtitle}>Accede a todos los beneficios</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {benefitRows.map((row, index) => (
          <View key={index} style={styles.row}>
            {row.map((benefit) => (
              <View key={benefit.id} style={styles.benefit}>
                <Ionicons name={benefit.icon} size={theme.text.display} color={theme.colors.text} />
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDescription}>{benefit.description}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Elige tu plan</Text>
        <View style={styles.row}>
          {plans.map((plan) => (
            <Pressable
              key={plan.id}
              style={[styles.plan, plan.id === selected && styles.planSelected]}
              onPress={() => setSelected(plan.id)}
            >
              <Text style={[styles.planName, plan.id === selected && styles.textSelected]}>{plan.name}</Text>
              <Text style={[styles.planPrice, plan.id === selected && styles.textSelected]}>{plan.price}</Text>
              <Text style={[styles.planPeriod, plan.id === selected && styles.textSelected]}>/mes</Text>
            </Pressable>
          ))}
        </View>
      </View>

      /* Trial button (team Button) */
      <Button label="Probar 7 días gratis" onPress={() => {}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { gap: theme.spacing.lg },
  row: { flexDirection: 'row', gap: theme.spacing.md },

  // Header
  header: { gap: theme.spacing.md },
  backButton: {
    alignSelf: 'flex-start',
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.card,
  },
  logo: {
    width: 105,
    height: 105,
    borderRadius: theme.radius.full,
    alignSelf: 'center',
  },
  texts: { alignItems: 'center', gap: theme.spacing.xs },
  title: { fontSize: theme.text.title, fontWeight: 'bold', color: theme.colors.text },
  subtitle: { fontSize: theme.text.caption, color: theme.colors.primary },

  // Benefits
  grid: { gap: theme.spacing.md },
  benefit: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  benefitTitle: { fontSize: theme.text.body, fontWeight: 'bold', color: theme.colors.text },
  benefitDescription: { fontSize: theme.text.caption, color: theme.colors.primary },

  // Plans
  section: { gap: theme.spacing.md },
  sectionTitle: { fontSize: theme.text.heading, fontWeight: 'bold', color: theme.colors.text },
  plan: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  planSelected: { backgroundColor: theme.colors.primary },
  planName: { fontSize: theme.text.caption, fontWeight: 'bold', color: theme.colors.text },
  planPrice: { fontSize: theme.text.display, fontWeight: 'bold', color: theme.colors.text },
  planPeriod: { fontSize: theme.text.caption, fontWeight: 'bold', color: theme.colors.text },
  textSelected: { color: '#FFFFFF' },
});
