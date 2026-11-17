import { useState } from 'react';
import { AppScreenProps } from '../../navigation/types';
import { useData } from '../../context/DataContext';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { activePlantation, fieldsOfCompany, parcelLabel, parcelsOfField } from '../../services/fieldQueries';
import { usersOfCompany } from '../../services/userQueries';
import { TaskTarget, TaskType } from '../../types/models';
import { isValidIsoDate, today } from '../../utils/date';
import { Button, ChipGroup, ErrorText, FormRow, Screen, ScreenHeader, SectionLabel, SelectField, TextField } from '../../components/ui';

const TASK_TYPES: readonly TaskType[] = ['Regar', 'Colocar adubo', 'Semear', 'Colher', 'Outra'];
const TARGETS: readonly TaskTarget[] = ['field', 'parcel', 'plantation'];
const TARGET_LABELS: Record<TaskTarget, string> = { field: 'Campo', parcel: 'Parcela', plantation: 'Plantação' };

export function NewTaskScreen({ navigation, route }: AppScreenProps<'NewTask'>) {
  const { state, actions } = useData();
  const user = useCurrentUser();
  const fields = fieldsOfCompany(state, user.companyId);
  const operators = usersOfCompany(state, user.companyId, 'operator');

  const [type, setType] = useState<TaskType>('Regar');
  const [target, setTarget] = useState<TaskTarget>('parcel');
  const [fieldId, setFieldId] = useState(route.params.fieldId ?? fields[0]?.id ?? '');
  const [parcelId, setParcelId] = useState(route.params.parcelId ?? '');
  const [operatorId, setOperatorId] = useState(operators[0]?.id ?? '');
  const [dueDate, setDueDate] = useState(today());
  const [dueTime, setDueTime] = useState('18:00');
  const [error, setError] = useState('');

  const parcels = parcelsOfField(state, fieldId).filter((parcel) => target !== 'plantation' || activePlantation(state, parcel.id));

  const handleFieldChange = (value: string) => {
    setFieldId(value);
    setParcelId('');
  };

  const handleSubmit = () => {
    if (!fieldId || !operatorId) return setError('Selecione o campo e o operador.');
    if (target !== 'field' && !parcelId) return setError('Selecione a parcela.');
    if (!isValidIsoDate(dueDate)) return setError('Data inválida (use AAAA-MM-DD).');
    actions.assignTask({ type, target, fieldId, parcelId: target === 'field' ? null : parcelId, operatorId, dueDate, dueTime }, user);
    navigation.goBack();
  };

  return (
    <Screen
      header={<ScreenHeader overline="Atribuir a um operador" title="Nova tarefa" onBack={navigation.goBack} />}
      footer={<Button label="Atribuir tarefa" onPress={handleSubmit} />}
    >
      <SectionLabel title="Tipo de tarefa" />
      <ChipGroup options={TASK_TYPES} value={type} onChange={setType} />
      <SectionLabel title="Associar a" />
      <ChipGroup options={TARGETS} value={target} onChange={setTarget} labels={TARGET_LABELS} />
      <SelectField label="Campo de cultivo" value={fieldId} onChange={handleFieldChange} options={fields.map((field) => ({ label: field.name, value: field.id }))} />
      {target !== 'field' && (
        <SelectField
          label="Parcela"
          value={parcelId}
          onChange={setParcelId}
          options={[{ label: 'Selecione a parcela', value: '' }, ...parcels.map((parcel) => ({ label: parcelLabel(state, parcel), value: parcel.id }))]}
        />
      )}
      <SelectField label="Operador" value={operatorId} onChange={setOperatorId} options={operators.map((operator) => ({ label: operator.name, value: operator.id }))} />
      <FormRow>
        <TextField label="Data limite" value={dueDate} onChangeText={setDueDate} placeholder="AAAA-MM-DD" />
        <TextField label="Hora" value={dueTime} onChangeText={setDueTime} placeholder="18:00" />
      </FormRow>
      <ErrorText message={error} />
    </Screen>
  );
}
