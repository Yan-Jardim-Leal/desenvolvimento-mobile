import { useState } from 'react';
import { AppScreenProps } from '../../navigation/types';
import { useData } from '../../context/DataContext';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { cropTypesOfCompany, findParcel } from '../../services/fieldQueries';
import { addDays, isValidIsoDate, today } from '../../utils/date';
import { Button, ChipGroup, EmptyState, ErrorText, FormRow, Notice, Screen, ScreenHeader, SectionLabel, TextField } from '../../components/ui';

export function NewPlantationScreen({ navigation, route }: AppScreenProps<'NewPlantation'>) {
  const { state, actions } = useData();
  const user = useCurrentUser();
  const cropTypes = cropTypesOfCompany(state, user.companyId);
  const [cropTypeId, setCropTypeId] = useState(cropTypes[0]?.id ?? '');
  const [plantedAt, setPlantedAt] = useState(today());
  const [harvestAt, setHarvestAt] = useState(addDays(today(), cropTypes[0]?.cycleDays ?? 90));
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const parcel = findParcel(state, route.params.parcelId);
  if (!parcel) return <EmptyState message="Parcela não encontrada." />;

  const handleCropChange = (id: string) => {
    setCropTypeId(id);
    const cycle = cropTypes.find((cropType) => cropType.id === id)?.cycleDays ?? 90;
    if (isValidIsoDate(plantedAt)) setHarvestAt(addDays(plantedAt, cycle));
  };

  const handleCreate = () => {
    if (!cropTypeId) return setError('Registe primeiro um tipo de cultivo.');
    if (!isValidIsoDate(plantedAt) || !isValidIsoDate(harvestAt)) return setError('Datas inválidas (use AAAA-MM-DD).');
    actions.addPlantation({ parcelId: parcel.id, cropTypeId, plantedAt, harvestAt, notes });
    navigation.goBack();
  };

  return (
    <Screen
      header={<ScreenHeader overline={`Parcela ${parcel.code} · em pousio`} title="Nova plantação" onBack={navigation.goBack} />}
      footer={<Button label="Criar plantação" onPress={handleCreate} />}
    >
      <SectionLabel title="Tipo de cultivo" />
      <ChipGroup
        options={cropTypes.map((cropType) => cropType.id)}
        value={cropTypeId}
        onChange={handleCropChange}
        labels={Object.fromEntries(cropTypes.map((cropType) => [cropType.id, cropType.name]))}
      />
      <Button label="+ Novo tipo" variant="link" onPress={() => navigation.navigate('CropTypes')} />
      <FormRow>
        <TextField label="Data de plantação" value={plantedAt} onChangeText={setPlantedAt} placeholder="AAAA-MM-DD" />
        <TextField label="Colheita prevista" value={harvestAt} onChangeText={setHarvestAt} placeholder="AAAA-MM-DD" />
      </FormRow>
      <TextField label="Notas" value={notes} onChangeText={setNotes} multiline placeholder="Variedade, densidade de plantação, origem das sementes…" />
      <Notice message="Cada parcela só pode ter uma plantação de cada vez." />
      <ErrorText message={error} />
    </Screen>
  );
}
