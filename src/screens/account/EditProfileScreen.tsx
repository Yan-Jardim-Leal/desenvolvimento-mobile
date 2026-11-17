import { useState } from 'react';
import { AppScreenProps } from '../../navigation/types';
import { useData } from '../../context/DataContext';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useForm } from '../../hooks/useForm';
import { hasEmpty } from '../../utils/validation';
import { Button, ErrorText, Screen, ScreenHeader, TextField } from '../../components/ui';

export function EditProfileScreen({ navigation }: AppScreenProps<'EditProfile'>) {
  const { actions } = useData();
  const user = useCurrentUser();
  const { values, setField } = useForm({ name: user.name, phone: user.phone });
  const [error, setError] = useState('');

  const handleSave = () => {
    if (hasEmpty(values.name)) return setError('O nome é obrigatório.');
    actions.updateProfile(user.id, { name: values.name.trim(), phone: values.phone.trim() });
    navigation.goBack();
  };

  return (
    <Screen
      header={<ScreenHeader overline="Perfil" title="Editar dados" onBack={navigation.goBack} />}
      footer={<Button label="Guardar alterações" onPress={handleSave} />}
    >
      <TextField label="Nome" value={values.name} onChangeText={setField('name')} />
      <TextField label="Telemóvel" value={values.phone} onChangeText={setField('phone')} keyboardType="phone-pad" />
      <ErrorText message={error} />
    </Screen>
  );
}
