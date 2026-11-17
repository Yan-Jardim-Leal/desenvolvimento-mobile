import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fontSize, radius, spacing } from '../../theme';

export function MapPlaceholder({ pins }: { pins: string[] }) {
  return (
    <View style={styles.map}>
      {pins.map((pin, index) => (
        <View key={pin} style={[styles.pin, { top: 20 + ((index * 47) % 110), left: `${15 + ((index * 31) % 60)}%` }]}>
          <MaterialCommunityIcons name="map-marker" size={18} color={colors.primary} />
          <Text style={styles.pinLabel}>{pin}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  map: { height: 170, borderRadius: radius.lg, backgroundColor: '#E3E8DC', borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  pin: { position: 'absolute', flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: radius.pill, paddingRight: spacing.sm, paddingLeft: 2 },
  pinLabel: { fontSize: fontSize.xs, fontWeight: '600', color: colors.text },
});
