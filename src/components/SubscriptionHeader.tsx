import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

export default function SubscriptionHeader() {
    return (
        <View style={styles.header}>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={theme.text.title} color={theme.colors.text} />
            </Pressable>
            <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
            <View style={styles.texts}>
                <Text style={styles.title}>Aprende sin límites</Text>
                <Text style={styles.subtitle}>Accede a todos los beneficios</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: { gap: theme.spacing.md },
    backButton: {
        alignSelf: 'flex-start',
        padding: theme.spacing.sm,
        borderRadius: theme.radius.sm,
        backgroundColor: theme.colors.card,
    },
    logo: {
        width: 105,
        height: 105,
        borderRadius: theme.radius.full,
        alignSelf: 'center',
    },
    texts: { alignItems: 'center', gap: theme.spacing.xs },
    title: { fontSize: theme.text.title, fontWeight: 'bold', color: theme.colors.text },
    subtitle: { fontSize: theme.text.caption, color: theme.colors.primary },
});