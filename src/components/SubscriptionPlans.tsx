import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

const plans = [
  { id: 'monthly', name: 'Mensual', price: '$4.99' },
  { id: 'yearly', name: 'Anual', price: '$2.99' },
];

export default function SubscriptionPlans() {
  const [selected, setSelected] = useState('monthly');

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Elige tu plan</Text>
      <View style={styles.row}>
        {plans.map((plan) => (
          <Pressable
            key={plan.id}
            style={[styles.plan, plan.id === selected && styles.planSelected]}
            onPress={() => setSelected(plan.id)}
          >
            <Text style={[styles.planName, plan.id === selected && styles.textSelected]}>
              {plan.name}
            </Text>
            <Text style={[styles.planPrice, plan.id === selected && styles.textSelected]}>
              {plan.price}
            </Text>
            <Text style={[styles.planPeriod, plan.id === selected && styles.textSelected]}>
              /mes
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: theme.spacing.md },
  sectionTitle: { fontSize: theme.text.heading, fontWeight: 'bold', color: theme.colors.text },
  row: { flexDirection: 'row', gap: theme.spacing.md },
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