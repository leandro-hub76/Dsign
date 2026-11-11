import SubscriptionHeader from '@/components/SubscriptionHeader';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import SubscriptionBenefits from '../components/SubscriptionBenefits';
import { theme } from '../constants/theme';

export default function Subscription() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <SubscriptionHeader />
        <SubscriptionBenefits />
        <SubscriptionPlans />
        <Button label="Probar 7 días gratis" onPress={() => {}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.xl, gap: theme.spacing.lg },
});