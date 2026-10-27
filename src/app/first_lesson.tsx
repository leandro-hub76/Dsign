import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';
export default function FirstLesson() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Primera leccion</Text>
      <Link href="/perfil" asChild>
  <Pressable style={styles.button}>
    <Text style={styles.buttonText}>Voler al perfil</Text>
  </Pressable>
</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, backgroundColor: colors.background },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.text },
  button: {backgroundColor: "#4F5D39",
paddingVertical: 10,
paddingHorizontal: 10,
borderRadius: 16, 
alignItems: 'center'},
buttonText: {fontSize: 16, 
fontWeight: 'normal', 
color: '#ffffff',} 
});