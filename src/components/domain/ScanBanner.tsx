import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fontSize, radius, spacing } from '../../theme';

export function ScanBanner({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.banner}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name="qrcode-scan" size={22} color={colors.white} />
      </View>
      <View style={styles.texts}>
        <Text style={styles.title}>Ler QR da parcela</Text>
        <Text style={styles.subtitle}>Veja as tarefas e registe observações no local</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={22} color={colors.white} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  banner: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.primary, borderRadius: radius.lg, padding: spacing.lg },
  icon: { width: 40, height: 40, borderRadius: radius.md, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  texts: { flex: 1 },
  title: { color: colors.white, fontSize: fontSize.md, fontWeight: '700' },
  subtitle: { color: '#CFE3D5', fontSize: fontSize.sm },
});
