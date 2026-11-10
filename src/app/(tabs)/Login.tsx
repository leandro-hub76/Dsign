import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthField from '../../components/AuthField';
import AuthTabs, { AuthMode } from '../../components/AuthTabs';
import { theme } from '../../constants/theme';

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isRegister = mode === 'register';

  function handleSubmit() {
    // Visual only for now: later we will validate and save the account here
    router.replace('/');
  }

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.brand}>
            <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.name}>Dsign</Text>
            <Text style={styles.tagline}>Aprende. Crea. Diseña.</Text>
          </View>

          <AuthTabs mode={mode} onChange={setMode} />

          <View style={styles.form}>
            {isRegister && (
              <AuthField
                label="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
                placeholder="Mínimo 6 caracteres"
              />
            )}
            <AuthField
              label="Correo"
              value={email}
              onChangeText={setEmail}
              placeholder="nombre@correo.com"
              keyboardType="email-address"
            />
            <AuthField
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              placeholder="Mínimo 6 caracteres"
              secure
            />
            {isRegister && (
              <AuthField
                label="Confirmar contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Mínimo 6 caracteres"
                secure
              />
            )}
            {!isRegister && <Text style={styles.forgot}>¿Olvidaste la contraseña?</Text>}
          </View>

          <Pressable style={styles.submit} onPress={handleSubmit}>
            <Text style={styles.submitText}>{isRegister ? 'Registrarse' : 'Iniciar sesión'}</Text>
          </Pressable>

          {!isRegister && (
            <View style={styles.social}>
              <View style={styles.divider}>
                <View style={styles.line} />
                <Text style={styles.dividerText}>o continúa con</Text>
                <View style={styles.line} />
              </View>
              <View style={styles.socialRow}>
                <Pressable style={styles.socialButton}>
                  <Text style={styles.socialText}>Apple</Text>
                </Pressable>
                <Pressable style={styles.socialButton}>
                  <Text style={styles.socialText}>Google</Text>
                </Pressable>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.xl, gap: theme.spacing.xl },
  brand: { alignItems: 'center', gap: theme.spacing.sm },
  logo: { width: 104, height: 104, borderRadius: theme.radius.full },
  name: { fontSize: theme.text.display, fontWeight: 'bold', color: theme.colors.primary },
  tagline: { fontSize: theme.text.subtitle, color: theme.colors.primary },
  form: { gap: theme.spacing.md },
  forgot: { alignSelf: 'flex-end', fontSize: theme.text.small, color: theme.colors.primary },
  submit: {
    alignSelf: 'center',
    minWidth: 210,
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
  },
  submitText: { fontSize: theme.text.subtitle, color: '#FFFFFF' },
  social: { gap: theme.spacing.md },
  divider: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },
  line: { flex: 1, height: 1, backgroundColor: theme.colors.sand },
  dividerText: { fontSize: theme.text.small, color: theme.colors.primary },
  socialRow: { flexDirection: 'row', gap: theme.spacing.sm },
  socialButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
  },
  socialText: { fontSize: theme.text.body, fontWeight: 'bold', color: theme.colors.sand },
});