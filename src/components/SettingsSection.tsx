import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';
import SettingsRow, { RowProps } from './SettingsRow';

type Props = { title: string; rows: RowProps[] };

export default function SettingsSection({ title, rows }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.card}>
        {rows.map((row, index) => (
          <SettingsRow key={row.id} {...row} isLast={index === rows.length - 1} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: theme.spacing.sm },
  title: { fontSize: theme.text.subtitle, fontWeight: 'bold', color: theme.colors.text },
  card: { borderRadius: theme.radius.lg, backgroundColor: theme.colors.card },
});