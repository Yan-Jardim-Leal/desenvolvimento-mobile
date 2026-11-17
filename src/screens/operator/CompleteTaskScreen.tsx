import { useState } from 'react';
import { AppScreenProps } from '../../navigation/types';
import { useData } from '../../context/DataContext';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { activePlantation, findParcel } from '../../services/fieldQueries';
import { findTask } from '../../services/taskQueries';
import { HarvestState, SoilState } from '../../types/models';
import { PlantStatusOption } from '../../types/forms';
import { Button, ChipGroup, EmptyState, Screen, ScreenHeader, SectionLabel, TextField } from '../../components/ui';

const SOIL_STATES: readonly SoilState[] = ['Seco', 'Húmido', 'Encharcado'];
const HARVEST_STATES: readonly HarvestState[] = ['Ainda não', 'Parcial', 'Colhida'];
const PLANT_STATES: readonly PlantStatusOption[] = ['Semeada', 'Crescimento', 'Floração', 'Pronta', 'Pousio'];

export function CompleteTaskScreen({ navigation, route }: AppScreenProps<'CompleteTask'>) {
  const { state, actions } = useData();
  const user = useCurrentUser();
  const task = findTask(state, route.params.taskId);
  const parcel = findParcel(state, task?.parcelId ?? null);
  const plantation = parcel ? activePlantation(state, parcel.id) : undefined;
  const [soil, setSoil] = useState<SoilState>('Húmido');
  const [harvest, setHarvest] = useState<HarvestState>('Ainda não');
  const [plantStatus, setPlantStatus] = useState<PlantStatusOption>(plantation?.status ?? 'Pousio');
  const [harvestAt, setHarvestAt] = useState(plantation?.harvestAt ?? '');
  const [observation, setObservation] = useState('');
  if (!task) return <EmptyState message="Tarefa não encontrada." />;

  const handleValidate = () => {
    actions.completeTask(task.id, { soil, harvest, plantStatus, harvestAt, observation }, user);
    navigation.goBack();
  };

  return (
    <Screen
      header={<ScreenHeader overline={`${task.type} · Parcela ${parcel?.code ?? ''}`} title="Concluir tarefa" onBack={navigation.goBack} />}
      footer={<Button label="Validar conclusão" onPress={handleValidate} />}
    >
      <SectionLabel title="Estado do solo" />
      <ChipGroup options={SOIL_STATES} value={soil} onChange={setSoil} />
      {plantation && (
        <>
          <SectionLabel title="Colheita" />
          <ChipGroup options={HARVEST_STATES} value={harvest} onChange={setHarvest} />
          <SectionLabel title="Estado da planta" />
          <ChipGroup options={PLANT_STATES} value={plantStatus} onChange={setPlantStatus} />
          <TextField label="Data de colheita prevista" value={harvestAt} onChangeText={setHarvestAt} placeholder="AAAA-MM-DD" />
        </>
      )}
      <TextField label="Observações" value={observation} onChangeText={setObservation} multiline placeholder="Descreva o trabalho realizado…" />
    </Screen>
  );
}
