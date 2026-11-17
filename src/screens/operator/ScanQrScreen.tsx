import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useData } from '../../context/DataContext';
import { useAppNavigation } from '../../navigation/types';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { findParcelByQrCode } from '../../services/fieldQueries';
import { isOpen, tasksOfOperator } from '../../services/taskQueries';
import { Button, ErrorText, Screen, ScreenHeader, TextField } from '../../components/ui';
import { colors, fontSize, radius, spacing } from '../../theme';

export function ScanQrScreen() {
  const navigation = useAppNavigation();
  const { state } = useData();
  const user = useCurrentUser();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const openParcel = (parcelId: string) => {
    setError('');
    setCode('');
    navigation.navigate('ScannedParcel', { parcelId });
  };

  const handleSimulateScan = () => {
    const task = tasksOfOperator(state, user.id).find((candidate) => isOpen(candidate) && candidate.parcelId);
    if (!task?.parcelId) return setError('Não tem tarefas pendentes em parcelas.');
    openParcel(task.parcelId);
  };

  const handleManualCode = () => {
    const parcel = findParcelByQrCode(state, code);
    if (!parcel) return setError('Código não encontrado.');
    openParcel(parcel.id);
  };

  return (
    <Screen dark header={<ScreenHeader title="Ler código QR" dark />}>
      <View style={styles.frame}>
        <MaterialCommunityIcons name="qrcode-scan" size={140} color={colors.white} />
      </View>
      <Text style={styles.hint}>Aponte a câmara para o código QR afixado na parcela</Text>
      <Button label="Simular leitura" icon="camera-outline" onPress={handleSimulateScan} />
      <Text style={styles.hint}>Não consegue ler o código?</Text>
      <View style={styles.manual}>
        <TextField label="Introduzir código manualmente" value={code} onChangeText={setCode} placeholder="P3-F1-0003" autoCapitalize="characters" />
        <Button label="Abrir parcela" variant="secondary" onPress={handleManualCode} />
      </View>
      <ErrorText message={error} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  frame: {
    alignSelf: 'center',
    padding: spacing.xl,
    marginVertical: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 3,
    borderColor: '#7BC48F',
  },
  hint: { textAlign: 'center', color: '#CFE3D5', fontSize: fontSize.sm },
  manual: { gap: spacing.sm, backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.md },
});
