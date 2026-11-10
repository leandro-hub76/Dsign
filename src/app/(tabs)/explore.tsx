import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { ReactNode, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CourseRow from '../../components/CourseRow';
import FeaturedCourse from '../../components/FeaturedCourse';
import Header from '../../components/Header';
import LessonCard from '../../components/LessonCard';
import SearchBar from '../../components/SearchBar';
import { theme } from '../../constants/theme';
// ---------- Data ----------

const categoryRows = [
  [
    { id: 'color', title: 'Color', courses: '14 cursos', icon: <Ionicons name="color-palette" size={24} color="#FFFFFF" /> },
    { id: 'type', title: 'Tipo', courses: '9 cursos', icon: <Text style={{ fontSize: 20, color: '#FFFFFF' }}>Aa</Text> },
    { id: 'layout', title: 'Layout', courses: '11 cursos', icon: <MaterialCommunityIcons name="view-dashboard" size={24} color="#FFFFFF" /> },
  ],
  [
    { id: 'brand', title: 'Marca', courses: '7 cursos', icon: <Ionicons name="document-text-outline" size={24} color="#FFFFFF" /> },
    { id: 'uiux', title: 'UI/UX', courses: '16 cursos', icon: <Feather name="figma" size={24} color="#FFFFFF" /> },
    { id: 'photo', title: 'Foto', courses: '8 cursos', icon: <Ionicons name="image-outline" size={24} color="#FFFFFF" /> },
  ],
];

type Course = {
  id: string;
  title: string;
  lessons: number;
  level: string;
  featured?: boolean;
  icon?: ReactNode;
};

const courses: Course[] = [
  { id: 'color-theory', title: 'Teoría del color', lessons: 12, level: 'Básico', featured: true },
  {
    id: 'mobile-ui',
    title: 'UI para celulares',
    lessons: 12,
    level: 'Básico',
    icon: <Feather name="figma" size={24} color="#FFFFFF" />,
  },
  {
    id: 'branding',
    title: 'Branding desde cero',
    lessons: 8,
    level: 'Básico',
    icon: <Ionicons name="document-text-outline" size={24} color="#FFFFFF" />,
  },
  {
    id: 'type-rules',
    title: 'Reglas de la tipografía',
    lessons: 12,
    level: 'Básico',
    icon: <Text style={{ fontSize: 20, color: '#FFFFFF' }}>Aa</Text>,
  },
];

// ---------- Screen ----------

export default function Explore() {
  const [query, setQuery] = useState('');

  const isSearching = query.trim() !== '';
  const filtered = courses.filter((course) =>
    course.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Header />
        <SearchBar value={query} onChange={setQuery} />

        {!isSearching && (
          <View style={styles.section}>
            <Text style={styles.title}>Categorías</Text>
            {categoryRows.map((row, index) => (
              <View key={index} style={styles.row}>
                {row.map((category) => (
                  <LessonCard
                    key={category.id}
                    title={category.title}
                    courses={category.courses}
                    icon={category.icon}
                    onPress={category.id === 'color' ? () => router.push('/lesson') : undefined}
                  />
                ))}
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.popularHeader}>
            <Text style={styles.title}>{isSearching ? 'Resultados' : 'Populares'}</Text>
            <Text style={styles.seeAll}>Ver todo</Text>
          </View>

          {filtered.map((course) =>
            course.featured ? (
              <FeaturedCourse
                key={course.id}
                title={course.title}
                lessons={course.lessons}
                level={course.level}
                onStart={() => router.push('/lesson')}
              />
            ) : (
              <CourseRow
                key={course.id}
                title={course.title}
                lessons={course.lessons}
                level={course.level}
                icon={course.icon}
              />
            )
          )}

          {filtered.length === 0 && (
            <Text style={styles.empty}>No encontramos cursos con esa búsqueda</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.xl, gap: theme.spacing.lg },
  section: { gap: theme.spacing.sm },
  title: { fontSize: theme.text.title, fontWeight: 'bold', color: theme.colors.text },
  row: { flexDirection: 'row', gap: theme.spacing.sm },
  popularHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  seeAll: { fontSize: theme.text.caption, color: theme.colors.textSecondary },
  empty: { textAlign: 'center', fontSize: theme.text.small, color: theme.colors.textSecondary },
});