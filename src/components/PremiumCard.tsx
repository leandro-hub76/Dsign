import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';
import Button from './Button';

const benefitRows = [
  [
    { id: '1', text: 'CURSOS ILIMITADOS' },
    { id: '2', text: 'SIN PUBLICACIONES' },
  ],
  [
    { id: '3', text: 'PROGRESO DETALLADO' },
    { id: '4', text: 'PROGRESO DETALLADO' },
  ],
];

export default function PremiumCard() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Suscripción premium</Text>

      <View style={styles.card}>
        <Text style={styles.heading}>APRENDE SIN LÍMITES</Text>

        <View style={styles.grid}>
          {benefitRows.map((row, index) => (
            <View key={index} style={styles.row}>
              {row.map((benefit) => (
                <View key={benefit.id} style={styles.benefit}>
                  <Text style={styles.benefitText}>{benefit.text}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <Button label="Probar 7 días gratis" onPress={() => router.push('/Subscription')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: theme.spacing.sm },
  title: { fontSize: theme.text.subtitle, fontWeight: 'bold', color: theme.colors.text },
  card: {
    gap: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.card,
  },
  heading: { fontSize: theme.text.body, fontWeight: 'bold', color: theme.colors.text },
  grid: { gap: theme.spacing.lg },
  row: { flexDirection: 'row' },
  benefit: { flex: 1, alignItems: 'center' },
  benefitText: {
    fontSize: theme.text.caption,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.text,
  },
});