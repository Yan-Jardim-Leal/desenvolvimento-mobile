import { Children, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../../theme';

export function FormRow({ children }: { children: ReactNode }) {
  return (
    <View style={styles.row}>
      {Children.map(children, (child) => (
        <View style={styles.cell}>{child}</View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md },
  cell: { flex: 1 },
});
