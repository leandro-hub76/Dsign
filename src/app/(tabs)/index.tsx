
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ContinueCard from '../../components/ContinueCard';
import Header from '../../components/Header';
import LevelCard from '../../components/LevelCard';
import ProgressRow from '../../components/ProgressRow';
import StatBox from '../../components/StatBox';
import WeekCard from '../../components/WeekCard';
import { theme } from '../../constants/theme';

// ---------- Data ----------

const nextLesson = {
  symbol: 'Aa',
  number: 3,
  topic: 'Tipografía',
  title: 'Reglas de Tipografía',
  minutes: 12,
};

type Stat = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  value: number;
  unit: string;
  label: string;
};

const stats: Stat[] = [
  {
    id: 'streak',
    icon: 'flame',
    value: 14,
    unit: 'días',
    label: 'RACHA',
  },
  {
    id: 'today',
    icon: 'flash',
    value: 220,
    unit: 'XP',
    label: 'HOY',
  },
  {
    id: 'month',
    icon: 'book',
    value: 4,
    unit: 'lec.',
    label: 'ESTE MES',
  },
];

const weekActivity = [
  true,
  true,
  true,
  false,
  false,
  false,
  false,
];

const inProgress = [
  {
    id: 'color',
    name: 'Color',
    progress: 45,
    icon: (
      <Ionicons
        name="color-palette"
        size={32}
        color="#FFFFFF"
      />
    ),
  },
  {
    id: 'uiux',
    name: 'UI-UX',
    progress: 60,
    icon: (
      <Feather
        name="layers"
        size={32}
        color="#FFFFFF"
      />
    ),
  },
  {
    id: 'brand',
    name: 'Marca y branding',
    progress: 20,
    icon: (
      <Ionicons
        name="document-text-outline"
        size={32}
        color="#FFFFFF"
      />
    ),
  },
];

// ---------- Screen ----------

export default function Home() {
  const handleContinue = () => {
    router.push('/lesson');
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Header />

        <View>
          <Text style={styles.welcome}>
            Bienvenido de vuelta
          </Text>

          <Text style={styles.userName}>
            Leandro Aramburo
          </Text>
        </View>

        <LevelCard level={8} filled={5} />

        <ContinueCard
          {...nextLesson}
          onContinue={handleContinue}
        />

        <View style={styles.statsRow}>
          {stats.map((stat) => (
            <StatBox
              key={stat.id}
              icon={stat.icon}
              value={stat.value}
              unit={stat.unit}
              label={stat.label}
            />
          ))}
        </View>

        <WeekCard activity={weekActivity} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            En curso
          </Text>

          {inProgress.map((course) => (
            <ProgressRow
              key={course.id}
              name={course.name}
              progress={course.progress}
              icon={course.icon}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------- Styles ----------

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  content: {
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
  },

  welcome: {
    fontSize: theme.text.title,
    fontWeight: 'bold',
    color: theme.colors.text,
  },

  userName: {
    fontSize: theme.text.body,
    color: theme.colors.text,
  },

  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },

  section: {
    gap: theme.spacing.sm,
  },

  sectionTitle: {
    fontSize: theme.text.body,
    color: theme.colors.textSecondary,
  },
});
