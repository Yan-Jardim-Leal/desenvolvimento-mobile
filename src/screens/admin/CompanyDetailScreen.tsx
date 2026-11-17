import { AppScreenProps } from '../../navigation/types';
import { useData } from '../../context/DataContext';
import { companyStats, findCompany } from '../../services/companyQueries';
import { usersOfCompany } from '../../services/userQueries';
import { fieldsOfCompany } from '../../services/fieldQueries';
import { formatArea } from '../../utils/format';
import { FieldRow, UserRow } from '../../components/domain';
import { Badge, Card, EmptyState, InfoRow, Screen, ScreenHeader, SectionLabel } from '../../components/ui';

export function CompanyDetailScreen({ navigation, route }: AppScreenProps<'CompanyDetail'>) {
  const { state } = useData();
  const company = findCompany(state, route.params.companyId);
  if (!company) return <EmptyState message="Empresa não encontrada." />;
  const farmers = usersOfCompany(state, company.id, 'farmer');
  const operators = usersOfCompany(state, company.id, 'operator');
  const fields = fieldsOfCompany(state, company.id);
  const openUser = (userId: string) => navigation.navigate('UserDetail', { userId });

  return (
    <Screen
      header={
        <ScreenHeader overline="Administração · Detalhe da empresa" title={company.name} onBack={navigation.goBack} right={<Badge label="REGISTO ATIVO" />} />
      }
    >
      <SectionLabel title="Dados fiscais e sede" />
      <Card>
        <InfoRow label="NIF empresarial" value={company.nif} />
        <InfoRow label="Contacto geral" value={company.phone || '—'} />
        <InfoRow label="Morada fiscal" value={`${company.address}, ${company.postalCode}`} />
      </Card>
      <SectionLabel title="Agricultor responsável (proprietário)" />
      {farmers.map((farmer) => (
        <UserRow key={farmer.id} user={farmer} subtitle="email" onPress={() => openUser(farmer.id)} />
      ))}
      <SectionLabel title={`Equipa de operadores (${operators.length} registados)`} />
      {operators.map((operator) => (
        <UserRow key={operator.id} user={operator} subtitle="email" onPress={() => openUser(operator.id)} />
      ))}
      <SectionLabel title={`Campos de cultivo vinculados (${fields.length})`} right={`${formatArea(companyStats(state, company.id).totalArea)} totais`} />
      {fields.map((field) => (
        <FieldRow key={field.id} field={field} onPress={() => navigation.navigate('FieldDashboard', { fieldId: field.id })} />
      ))}
    </Screen>
  );
}
