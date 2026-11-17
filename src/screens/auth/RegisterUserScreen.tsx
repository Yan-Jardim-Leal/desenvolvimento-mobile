import { useState } from 'react';
import { AuthScreenProps } from '../../navigation/types';
import { useForm } from '../../hooks/useForm';
import { hasEmpty, isEmail } from '../../utils/validation';
import { Button, ErrorText, Screen, ScreenHeader, SectionLabel, TextField } from '../../components/ui';

export function RegisterUserScreen({ navigation }: AuthScreenProps<'RegisterUser'>) {
  const { values, setField } = useForm({ firstName: '', lastName: '', email: '', password: '', confirmation: '' });
  const [error, setError] = useState('');

  const handleNext = () => {
    if (hasEmpty(...Object.values(values))) return setError('Preencha todos os campos.');
    if (!isEmail(values.email)) return setError('Email inválido.');
    if (values.password !== values.confirmation) return setError('As palavras-passe não coincidem.');
    navigation.navigate('RegisterCompany', {
      account: { name: `${values.firstName.trim()} ${values.lastName.trim()}`, email: values.email.trim(), password: values.password },
    });
  };

  return (
    <Screen
      header={<ScreenHeader overline="Registo do agricultor" title="Registando utilizador" onBack={navigation.goBack} />}
      footer={<Button label="Prosseguir" onPress={handleNext} />}
    >
      <SectionLabel title="Dados pessoais" />
      <TextField label="Nome" value={values.firstName} onChangeText={setField('firstName')} placeholder="Ana" />
      <TextField label="Apelido" value={values.lastName} onChangeText={setField('lastName')} placeholder="Martins" />
      <TextField label="Email" value={values.email} onChangeText={setField('email')} autoCapitalize="none" keyboardType="email-address" placeholder="nome@empresa.pt" />
      <TextField label="Palavra-passe" value={values.password} onChangeText={setField('password')} secureTextEntry />
      <TextField label="Confirmar palavra-passe" value={values.confirmation} onChangeText={setField('confirmation')} secureTextEntry />
      <ErrorText message={error} />
    </Screen>
  );
}
