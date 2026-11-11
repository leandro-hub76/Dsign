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
import AuthField from '../components/AuthField';
import AuthTabs, { AuthMode } from '../components/AuthTabs';
import { theme } from '../constants/theme';
import { loadUsers, saveSession, saveUsers, User } from '../storage/data';

type Errors = {
  username?: string;
  email?: string;
  password?: string;
  confirm?: string;
  form?: string;
};

export default function Login() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState('');

  const isRegister = mode === 'register';

  function changeMode(newMode: AuthMode) {
    setMode(newMode);
    setErrors({});
    setNotice('');
  }

  function validate(): Errors {
    const found: Errors = {};

    if (isRegister && username.trim().length < 6) {
      found.username = 'Mínimo 6 caracteres';
    }
    if (!email.includes('@') || !email.includes('.')) {
      found.email = 'Escribe un correo válido';
    }
    if (password.length < 6) {
      found.password = 'Mínimo 6 caracteres';
    }
    if (isRegister && confirmPassword !== password) {
      found.confirm = 'Las contraseñas no coinciden';
    }
    return found;
  }

  async function handleRegister() {
    const users = await loadUsers();
    const cleanEmail = email.trim().toLowerCase();

    if (users.some((user) => user.email === cleanEmail)) {
      setErrors({ email: 'Ese correo ya está registrado' });
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      username: username.trim(),
      email: cleanEmail,
      password,
    };

    await saveUsers([newUser, ...users]);

    // Go to the login so the new account is checked there
    setMode('login');
    setPassword('');
    setConfirmPassword('');
    setNotice('Cuenta creada. Ahora inicia sesión.');
  }

  async function handleLogin() {
    const users = await loadUsers();
    const cleanEmail = email.trim().toLowerCase();

    const found = users.find((user) => user.email === cleanEmail && user.password === password);

    if (found === undefined) {
      setErrors({ form: 'Correo o contraseña incorrectos' });
      return;
    }

    await saveSession(found.id);
    router.replace('/');
  }

  async function handleSubmit() {
    const found = validate();
    setErrors(found);
    setNotice('');

    if (Object.keys(found).length > 0) return;

    if (isRegister) {
      await handleRegister();
    } else {
      await handleLogin();
    }
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

          <AuthTabs mode={mode} onChange={changeMode} />

          <View style={styles.form}>
            {isRegister && (
              <AuthField
                label="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
                placeholder="Mínimo 6 caracteres"
                error={errors.username}
              />
            )}
            <AuthField
              label="Correo"
              value={email}
              onChangeText={setEmail}
              placeholder="nombre@correo.com"
              keyboardType="email-address"
              error={errors.email}
            />
            <AuthField
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              placeholder="Mínimo 6 caracteres"
              secure
              error={errors.password}
            />
            {isRegister && (
              <AuthField
                label="Confirmar contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Mínimo 6 caracteres"
                secure
                error={errors.confirm}
              />
            )}
            {!isRegister && <Text style={styles.forgot}>¿Olvidaste la contraseña?</Text>}
          </View>

          {notice !== '' && <Text style={styles.notice}>{notice}</Text>}
          {errors.form && <Text style={styles.formError}>{errors.form}</Text>}

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
  notice: {
    textAlign: 'center',
    fontSize: theme.text.body,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  formError: { textAlign: 'center', fontSize: theme.text.body, color: theme.colors.error },
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