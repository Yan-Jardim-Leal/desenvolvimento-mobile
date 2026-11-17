import { StyleSheet, Text, View } from 'react-native';
import { fontSize, Tone, tones } from '../../theme';
import { initials } from '../../utils/format';

interface Props {
  name: string;
  tone?: Tone;
  size?: number;
}

export function Avatar({ name, tone = 'earth', size = 40 }: Props) {
  const { background, foreground } = tones[tone];
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: background }]}>
      <Text style={[styles.text, { color: foreground }]}>{initials(name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: { alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: fontSize.sm, fontWeight: '700' },
});
