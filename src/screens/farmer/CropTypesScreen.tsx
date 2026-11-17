import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { AppScreenProps } from '../../navigation/types';
import { useData } from '../../context/DataContext';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useForm } from '../../hooks/useForm';
import { findCompany } from '../../services/companyQueries';
import { activePlantationsOfCrop, cropTypesOfCompany } from '../../services/fieldQueries';
import { hasEmpty } from '../../utils/validation';
import { plural } from '../../utils/format';
import { Button, Card, ErrorText, IconButton, IconTile, ListRow, Screen, ScreenHeader, TextField } from '../../components/ui';
import { colors, fontSize } from '../../theme';

export function CropTypesScreen({ navigation }: AppScreenProps<'CropTypes'>) {
  const { state, actions } = useData();
  const user = useCurrentUser();
  const cropTypes = cropTypesOfCompany(state, user.companyId);
  const { values, setField, reset } = useForm({ name: '', cycleDays: '90' });
  const [error, setError] = useState('');

  const handleRegister = () => {
    const cycleDays = Number(values.cycleDays);
    if (hasEmpty(values.name) || !cycleDays) return setError('Indique o nome e os dias para colheita.');
    actions.addCropType(user.companyId ?? '', values.name.trim(), cycleDays);
    setError('');
    reset();
  };

  const describe = (cropTypeId: string, cycleDays: number) => {
    const active = activePlantationsOfCrop(state, cropTypeId);
    const plantations = active ? plural(active, 'plantação ativa', 'plantações ativas') : 'Sem plantações';
    return `${plantations} · ciclo ~${cycleDays} dias`;
  };

  return (
    <Screen header={<ScreenHeader overline={findCompany(state, user.companyId)?.name} title="Tipos de cultivo" onBack={navigation.goBack} />}>
      <Card>
        <Text style={styles.title}>Registar novo cultivo</Text>
        <TextField label="Cultivo" value={values.name} onChangeText={setField('name')} placeholder="Nome do cultivo" />
        <TextField label="Dias para colheita" value={values.cycleDays} onChangeText={setField('cycleDays')} keyboardType="number-pad" />
        <ErrorText message={error} />
        <Button label="Registar cultivo" onPress={handleRegister} />
      </Card>
      {cropTypes.map((cropType) => (
        <ListRow
          key={cropType.id}
          title={cropType.name}
          subtitle={describe(cropType.id, cropType.cycleDays)}
          leading={<IconTile icon="sprout-outline" tone="earth" />}
          trailing={<IconButton icon="trash-can-outline" color={colors.danger} onPress={() => actions.removeCropType(cropType.id)} />}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
});
