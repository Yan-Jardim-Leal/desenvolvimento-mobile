import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colors, fontSize, radius, spacing } from '../../theme';

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export function SelectField({ label, value, options, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.box}>
        <Picker selectedValue={value} onValueChange={(selected) => onChange(String(selected))} style={styles.picker}>
          {options.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.xs },
  label: { fontSize: fontSize.sm, color: colors.muted },
  box: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, overflow: 'hidden' },
  picker: { color: colors.text, backgroundColor: colors.card, borderWidth: 0, padding: spacing.sm, fontSize: fontSize.md },
});
