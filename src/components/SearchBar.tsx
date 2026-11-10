import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, TextInput, View } from 'react-native';
import { theme } from '../constants/theme';

type Props = { value: string; onChange: (text: string) => void };

export default function SearchBar({ value, onChange }: Props) {
  return (
    <View style={styles.bar}>
      <Ionicons name="search" size={16} color={theme.colors.text} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="Buscar cursos, lecciones..."
        placeholderTextColor={theme.colors.textSecondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    height: 44,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.card,
  },
  input: { flex: 1, fontSize: theme.text.body, color: theme.colors.text },
});