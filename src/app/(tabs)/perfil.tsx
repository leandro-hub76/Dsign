import { ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import LessonStats from '../../components/LessonStats';
import PremiumCard from '../../components/PremiumCard';
import ProfileInfo from '../../components/ProfileInfo';
import RankProgress from '../../components/RankProgress';
import { theme } from '../../constants/theme';

const enter = (index: number) => FadeInDown.delay(index * 100);

export default function Perfil() {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={enter(0)}>
          <Header />
        </Animated.View>
        <Animated.View entering={enter(1)}>
          <ProfileInfo />
        </Animated.View>
        <Animated.View entering={enter(2)}>
          <RankProgress />
        </Animated.View>
        <Animated.View entering={enter(3)}>
          <PremiumCard />
        </Animated.View>
        <Animated.View entering={enter(4)}>
          <LessonStats />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.xl, gap: theme.spacing.lg },
});