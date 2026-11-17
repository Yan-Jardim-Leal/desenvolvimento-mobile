import { useState } from 'react';
import { AuthScreenProps } from '../../navigation/types';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useForm } from '../../hooks/useForm';
import { hasEmpty } from '../../utils/validation';
import { Button, ErrorText, FormRow, Screen, ScreenHeader, SectionLabel, TextField } from '../../components/ui';

export function RegisterCompanyScreen({ navigation, route }: AuthScreenProps<'RegisterCompany'>) {
  const { actions } = useData();
  const { signIn } = useAuth();
  const { values, setField } = useForm({ name: '', nif: '', postalCode: '', address: '' });
  const [error, setError] = useState('');

  const handleCreate = () => {
    if (hasEmpty(...Object.values(values))) return setError('Preencha todos os campos.');
    const user = actions.registerFarmer(route.params.account, values);
    signIn(user.id);
  };

  return (
    <Screen
      header={<ScreenHeader overline="Registo do agricultor" title="Registando empresa" onBack={navigation.goBack} />}
      footer={<Button label="Criar conta e empresa" onPress={handleCreate} />}
    >
      <SectionLabel title="Dados fiscais da empresa" />
      <TextField label="Nome da empresa" value={values.name} onChangeText={setField('name')} placeholder="Quinta do Vale, Lda." />
      <FormRow>
        <TextField label="NIF" value={values.nif} onChangeText={setField('nif')} keyboardType="number-pad" placeholder="514 208 337" />
        <TextField label="Código postal" value={values.postalCode} onChangeText={setField('postalCode')} placeholder="5370-210" />
      </FormRow>
      <TextField label="Morada" value={values.address} onChangeText={setField('address')} placeholder="Rua da Ribeira 14, Mirandela" />
      <ErrorText message={error} />
    </Screen>
  );
}
