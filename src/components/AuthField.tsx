import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { theme } from '../constants/theme';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secure?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
};

export default function AuthField({
  label,
  value,
  onChangeText,
  placeholder,
  secure,
  keyboardType,
}: Props) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.card}
        secureTextEntry={secure}
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: theme.spacing.xs },
  label: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.text.subtitle,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  input: {
    height: 52,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.full,
    fontSize: theme.text.subtitle,
    color: theme.colors.text,
    backgroundColor: theme.colors.sage,
  },
});