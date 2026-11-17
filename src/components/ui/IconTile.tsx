import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { radius, Tone, tones } from '../../theme';
import { IconName } from './types';

interface Props {
  icon: IconName;
  tone?: Tone;
  size?: number;
}

export function IconTile({ icon, tone = 'success', size = 40 }: Props) {
  const { background, foreground } = tones[tone];
  return (
    <View style={[styles.tile, { width: size, height: size, backgroundColor: background }]}>
      <MaterialCommunityIcons name={icon} size={size / 2} color={foreground} />
    </View>
  );
}

const styles = StyleSheet.create({
  tile: { borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
});
