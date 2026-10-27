import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';

export default function Explore() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Explorar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, backgroundColor: colors.background },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.text },
});