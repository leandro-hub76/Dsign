
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { ReactNode, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import CourseRow from '../../components/CourseRow';
import FeaturedCourse from '../../components/FeaturedCourse';
import Header from '../../components/Header';
import LessonCard from '../../components/LessonCard';
import SearchBar from '../../components/SearchBar';
import { theme } from '../../constants/theme';

// ANIMACIÓN FADE IN
const enter = (index: number) =>
  FadeInDown.delay(index * 100).duration(450);

// CATEGORÍAS
const categoryRows = [
  [
    {
      id: 'color',
      title: 'Color',
      courses: '14 cursos',
      icon: (
        <Ionicons
          name="color-palette"
          size={24}
          color="#FFFFFF"
        />
      ),
    },
    {
      id: 'type',
      title: 'Tipo',
      courses: '9 cursos',
      icon: (
        <Text style={{ fontSize: 20, color: '#FFFFFF' }}>
          Aa
        </Text>
      ),
    },
    {
      id: 'layout',
      title: 'Layout',
      courses: '11 cursos',
      icon: (
        <MaterialCommunityIcons
          name="view-dashboard"
          size={24}
          color="#FFFFFF"
        />
      ),
    },
  ],
  [
    {
      id: 'brand',
      title: 'Marca',
      courses: '7 cursos',
      icon: (
        <Ionicons
          name="document-text-outline"
          size={24}
          color="#FFFFFF"
        />
      ),
    },
    {
      id: 'uiux',
      title: 'UI/UX',
      courses: '16 cursos',
      icon: (
        <Feather
          name="figma"
          size={24}
          color="#FFFFFF"
        />
      ),
    },
    {
      id: 'photo',
      title: 'Foto',
      courses: '8 cursos',
      icon: (
        <Ionicons
          name="image-outline"
          size={24}
          color="#FFFFFF"
        />
      ),
    },
  ],
];

// TIPO DE CURSO
type Course = {
  id: string;
  title: string;
  lessons: number;
  level: string;
  featured?: boolean;
  icon?: ReactNode;
};

// CURSOS
const courses: Course[] = [
  {
    id: 'color-theory',
    title: 'Teoría del color',
    lessons: 12,
    level: 'Básico',
    featured: true,
  },
  {
    id: 'mobile-ui',
    title: 'UI para celulares',
    lessons: 12,
    level: 'Básico',
    icon: (
      <Feather
        name="figma"
        size={24}
        color="#FFFFFF"
      />
    ),
  },
  {
    id: 'branding',
    title: 'Branding desde cero',
    lessons: 8,
    level: 'Básico',
    icon: (
      <Ionicons
        name="document-text-outline"
        size={24}
        color="#FFFFFF"
      />
    ),
  },
  {
    id: 'type-rules',
    title: 'Reglas de la tipografía',
    lessons: 12,
    level: 'Básico',
    icon: (
      <Text style={{ fontSize: 20, color: '#FFFFFF' }}>
        Aa
      </Text>
    ),
  },
];

// PANTALLA EXPLORAR
export default function Explore() {

  const [query, setQuery] = useState('');

  // COMPROBAR SI EL USUARIO ESTÁ BUSCANDO
  const isSearching = query.trim() !== '';

  // FILTRAR CURSOS
  const filtered = courses.filter((course) =>
    course.title
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  );

  return (
    <SafeAreaView
      style={styles.screen}
      edges={['top']}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <Animated.View entering={enter(0)}>
          <Header />
        </Animated.View>

        {/* BUSCADOR */}
        <Animated.View entering={enter(1)}>
          <SearchBar
            value={query}
            onChange={setQuery}
          />
        </Animated.View>

        {/* CATEGORÍAS */}
        {!isSearching && (
          <View style={styles.section}>

            <Animated.View entering={enter(2)}>
              <Text style={styles.title}>
                Categorías
              </Text>
            </Animated.View>

            {categoryRows.map((row, index) => (
              <Animated.View
                key={index}
                entering={enter(index + 3)}
                style={styles.row}
              >
                {row.map((category) => (
                  <LessonCard
                    key={category.id}
                    title={category.title}
                    courses={category.courses}
                    icon={category.icon}
                    onPress={
                      category.id === 'color'
                        ? () => router.push('/lesson')
                        : undefined
                    }
                  />
                ))}
              </Animated.View>
            ))}

          </View>
        )}

        {/* CURSOS POPULARES */}
        <View style={styles.section}>

          <Animated.View
            entering={enter(5)}
            style={styles.popularHeader}
          >
            <Text style={styles.title}>
              {isSearching ? 'Resultados' : 'Populares'}
            </Text>

            <Text style={styles.seeAll}>
              Ver todo
            </Text>
          </Animated.View>

          {/* LISTA DE CURSOS */}
          {filtered.map((course, index) => (
            <Animated.View
              key={course.id}
              entering={enter(index + 6)}
            >
              {course.featured ? (

                <FeaturedCourse
                  title={course.title}
                  lessons={course.lessons}
                  level={course.level}
                  onStart={() => router.push('/lesson')}
                />

              ) : (

                <CourseRow
                  title={course.title}
                  lessons={course.lessons}
                  level={course.level}
                  icon={course.icon}
                />

              )}
            </Animated.View>
          ))}

          {/* SIN RESULTADOS */}
          {filtered.length === 0 && (
            <Animated.View entering={FadeInDown}>
              <Text style={styles.empty}>
                No encontramos cursos con esa búsqueda
              </Text>
            </Animated.View>
          )}

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

  section: {
    gap: theme.spacing.sm,
  },

  title: {
    fontSize: theme.text.title,
    fontWeight: 'bold',
    color: theme.colors.text,
  },

  row: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },

  popularHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  seeAll: {
    fontSize: theme.text.caption,
    color: theme.colors.textSecondary,
  },

  empty: {
    textAlign: 'center',
    fontSize: theme.text.small,
    color: theme.colors.textSecondary,
  },

});
