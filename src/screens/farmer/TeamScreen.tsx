import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useData } from '../../context/DataContext';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useForm } from '../../hooks/useForm';
import { findCompany } from '../../services/companyQueries';
import { usersOfCompany } from '../../services/userQueries';
import { isOpen, tasksOfOperator } from '../../services/taskQueries';
import { hasEmpty, isEmail } from '../../utils/validation';
import { plural } from '../../utils/format';
import { UserRow } from '../../components/domain';
import { Button, Card, EmptyState, ErrorText, Screen, ScreenHeader, TextField } from '../../components/ui';
import { colors, fontSize } from '../../theme';

export function TeamScreen() {
  const { state, actions } = useData();
  const user = useCurrentUser();
  const company = findCompany(state, user.companyId);
  const operators = usersOfCompany(state, user.companyId, 'operator');
  const { values, setField, reset } = useForm({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (hasEmpty(values.name, values.email, values.password)) return setError('Preencha todos os campos.');
    if (!isEmail(values.email)) return setError('Email inválido.');
    actions.addOperator(user, values);
    setError('');
    reset();
  };

  return (
    <Screen header={<ScreenHeader overline={`Operadores da ${company?.name ?? ''}`} title="Equipa" />}>
      <Card>
        <Text style={styles.title}>Registar novo operador</Text>
        <TextField label="Nome completo" value={values.name} onChangeText={setField('name')} placeholder="Nome do operador" />
        <TextField label="Email" value={values.email} onChangeText={setField('email')} placeholder="email@empresa.pt" autoCapitalize="none" keyboardType="email-address" />
        <TextField label="Senha" value={values.password} onChangeText={setField('password')} placeholder="Senha do operador" secureTextEntry />
        <ErrorText message={error} />
        <Button label="Registar operador" onPress={handleRegister} />
        <Text style={styles.caption}>Fica com o perfil "Operador", associado à {company?.name}.</Text>
      </Card>
      {operators.map((operator) => (
        <UserRow
          key={operator.id}
          user={operator}
          subtitle="email"
          badge={plural(tasksOfOperator(state, operator.id).filter(isOpen).length, 'tarefa', 'tarefas')}
        />
      ))}
      {operators.length === 0 && <EmptyState message="Ainda não há operadores registados." />}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  caption: { fontSize: fontSize.xs, color: colors.muted },
});
