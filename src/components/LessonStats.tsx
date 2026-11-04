import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';
import LessonCard from './LessonCard';
const soon = ['1', '2', '3'];

export default function LessonStats() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Lecciones completadas</Text>

      <View style={styles.row}>
        <LessonCard
          title="Color"
          courses="2 cursos"
          icon={<Ionicons name="color-palette" size={24} color="#FFFFFF" />}
          onPress={() => router.push('/lesson')}
        />
        <LessonCard
          title="Tipo"
          courses="5 cursos"
          icon={<Text style={styles.typeIcon}>Aa</Text>}
        />
        <LessonCard
          title="UI/UX"
          courses="10 cursos"
          icon={<Feather name="figma" size={24} color="#FFFFFF" />}
        />
      </View>

      <View style={styles.row}>
        {soon.map((id) => (
          <LessonCard key={id} title="Soon" />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: theme.spacing.sm },
  title: { fontSize: theme.text.subtitle, fontWeight: 'bold', color: theme.colors.text },
  row: { flexDirection: 'row', gap: theme.spacing.sm },
  typeIcon: { fontSize: theme.text.subtitle, color: '#FFFFFF' },
});