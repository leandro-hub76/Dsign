
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import ContinueCard from '../../components/ContinueCard';
import Header from '../../components/Header';
import LevelCard from '../../components/LevelCard';
import ProgressRow from '../../components/ProgressRow';
import StatBox from '../../components/StatBox';
import WeekCard from '../../components/WeekCard';
import { theme } from '../../constants/theme';
import { loadSession, User } from '../../storage/data';

// ANIMACIÓN FADE IN
const enter = (index: number) =>
  FadeInDown.delay(index * 100).duration(450);

// DATOS DE LA SIGUIENTE LECCIÓN
const nextLesson = {
  symbol: 'Aa',
  number: 3,
  topic: 'Tipografía',
  title: 'Reglas de Tipografía',
  minutes: 12,
};

// TIPO DE ESTADÍSTICAS
type Stat = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  value: number;
  unit: string;
  label: string;
};

// ESTADÍSTICAS
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

// ACTIVIDAD SEMANAL
const weekActivity = [
  true,
  true,
  true,
  false,
  false,
  false,
  false,
];

// CURSOS EN PROGRESO
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

// PANTALLA PRINCIPAL
export default function Home() {

  const [user, setUser] = useState<User | null>(null);

  // IR A LA LECCIÓN
  const handleContinue = () => {
    router.push('/lesson');
  };

  // OBTENER EL USUARIO
  useFocusEffect(
    useCallback(() => {
      async function fetchUser() {
        const session = await loadSession();

        if (session === null) {
          router.replace('/Login');
          return;
        }

        setUser(session);
      }

      fetchUser();
    }, [])
  );

  return (
    <SafeAreaView
      style={styles.screen}
      edges={['top']}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <Animated.View entering={enter(0)}>
          <Header />
        </Animated.View>

        {/* BIENVENIDA */}
        <Animated.View entering={enter(1)}>
          <Text style={styles.welcome}>
            Bienvenido de vuelta
          </Text>

          <Text style={styles.userName}>
            {user?.username}
          </Text>
        </Animated.View>

        {/* NIVEL */}
        <Animated.View entering={enter(2)}>
          <LevelCard
            level={8}
            filled={5}
          />
        </Animated.View>

        {/* CONTINUAR LECCIÓN */}
        <Animated.View entering={enter(3)}>
          <ContinueCard
            {...nextLesson}
            onContinue={handleContinue}
          />
        </Animated.View>

        {/* ESTADÍSTICAS */}
        <Animated.View
          entering={enter(4)}
          style={styles.statsRow}
        >
          {stats.map((stat) => (
            <StatBox
              key={stat.id}
              icon={stat.icon}
              value={stat.value}
              unit={stat.unit}
              label={stat.label}
            />
          ))}
        </Animated.View>

        {/* ACTIVIDAD SEMANAL */}
        <Animated.View entering={enter(5)}>
          <WeekCard activity={weekActivity} />
        </Animated.View>

        {/* CURSOS EN PROGRESO */}
        <View style={styles.section}>

          <Animated.View entering={enter(6)}>
            <Text style={styles.sectionTitle}>
              En curso
            </Text>
          </Animated.View>

          {inProgress.map((course, index) => (
            <Animated.View
              key={course.id}
              entering={enter(index + 7)}
            >
              <ProgressRow
                name={course.name}
                progress={course.progress}
                icon={course.icon}
              />
            </Animated.View>
          ))}

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ESTILOS
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
