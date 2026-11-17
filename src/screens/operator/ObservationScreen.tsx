import { useState } from 'react';
import { AppScreenProps } from '../../navigation/types';
import { useData } from '../../context/DataContext';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { findParcel } from '../../services/fieldQueries';
import { Button, ErrorText, Screen, ScreenHeader, TextField } from '../../components/ui';

export function ObservationScreen({ navigation, route }: AppScreenProps<'Observation'>) {
  const { state, actions } = useData();
  const user = useCurrentUser();
  const parcel = findParcel(state, route.params.parcelId);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!text.trim()) return setError('Escreva a observação.');
    actions.addObservation(route.params.parcelId, user, text.trim());
    navigation.goBack();
  };

  return (
    <Screen
      header={<ScreenHeader overline={`Parcela ${parcel?.code ?? ''}`} title="Registar observação" onBack={navigation.goBack} />}
      footer={<Button label="Guardar observação" onPress={handleSave} />}
    >
      <TextField label="Observação" value={text} onChangeText={setText} multiline placeholder="Estado do solo, pragas, desenvolvimento das plantas…" />
      <ErrorText message={error} />
    </Screen>
  );
}
