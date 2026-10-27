import { Pressable, StyleSheet, Text } from 'react-native';
type Props = { label: string; onPress: () => void };
export default function Button({ label, onPress }: Props) {
return (
<Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
<Text style={styles.label}>{label}</Text>
</Pressable>
);
}
const styles = StyleSheet.create({
// Select your button in Figma and fill each value with a theme key.
button: {
backgroundColor: "#4F5D39", // Fill → theme.colors
paddingVertical: 10, // Auto layout → vertical padding → theme.spacing
paddingHorizontal: 10, // Auto layout → horizontal padding → theme.spacing
borderRadius: 16, // Corner radius → theme.radius
alignItems: 'center',
},
pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
// Select the button text in Figma.
label: {
fontSize: 16, // Typography → Font size → theme.text
fontWeight: 'normal', // Typography → weight: 'normal', '500', '600' or 'bold'
color: '#ffffff', // Fill of the text → theme.colors
},
});