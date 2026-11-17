import { Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme';
import { IconName } from './types';

interface Props {
  icon: IconName;
  onPress: () => void;
  filled?: boolean;
  color?: string;
}

export function IconButton({ icon, onPress, filled = false, color }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.button, filled ? styles.filled : styles.outlined]} hitSlop={8}>
      <MaterialCommunityIcons name={icon} size={20} color={color ?? (filled ? colors.white : colors.text)} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  filled: { backgroundColor: colors.primary },
  outlined: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
});
