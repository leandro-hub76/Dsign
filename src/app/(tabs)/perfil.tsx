import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import LessonStats from '../../components/LessonStats';
import PremiumCard from '../../components/PremiumCard';
import ProfileInfo from '../../components/ProfileInfo';
import RankProgress from '../../components/RankProgress';
import { theme } from '../../constants/theme';

export default function Perfil() {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Header />
        <ProfileInfo />
        <RankProgress />
        <PremiumCard />
        <LessonStats />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.xl, gap: theme.spacing.lg },
});