import { AppScreenProps } from '../../navigation/types';
import { useData } from '../../context/DataContext';
import { findUser } from '../../services/userQueries';
import { companyStats, findCompany } from '../../services/companyQueries';
import { fieldsOfCompany } from '../../services/fieldQueries';
import { tasksOfCompany, tasksOfOperator } from '../../services/taskQueries';
import { formatDate } from '../../utils/date';
import { plural } from '../../utils/format';
import { ProfileHeader } from '../../components/domain';
import { Badge, Card, EmptyState, IconTile, InfoRow, KpiRow, ListRow, Notice, Screen, ScreenHeader, SectionLabel } from '../../components/ui';

export function UserDetailScreen({ navigation, route }: AppScreenProps<'UserDetail'>) {
  const { state } = useData();
  const user = findUser(state, route.params.userId);
  if (!user) return <EmptyState message="Utilizador não encontrado." />;
  const company = findCompany(state, user.companyId);
  const fields = fieldsOfCompany(state, user.companyId);
  const parcels = state.parcels.filter((parcel) => fields.some((field) => field.id === parcel.fieldId));
  const tasks = user.role === 'farmer' ? tasksOfCompany(state, user.companyId) : tasksOfOperator(state, user.id);
  const stats = company && companyStats(state, company.id);

  return (
    <Screen header={<ScreenHeader overline="Utilizadores" title={user.name} onBack={navigation.goBack} right={<Badge label="CONTA ATIVA" />} />}>
      <ProfileHeader user={user} caption={`ID: ${user.id} · Registo: ${formatDate(user.createdAt)}`} />
      <SectionLabel title="Dados pessoais e de contacto" />
      <Card>
        <InfoRow label="Telemóvel" value={user.phone || '—'} />
        <InfoRow label="Localidade" value={user.location || '—'} />
      </Card>
      {company && stats && (
        <>
          <SectionLabel title="Empresa associada ao perfil" />
          <ListRow
            title={company.name}
            subtitle={`NIF ${company.nif} · ${company.city}`}
            detail={`${plural(stats.operators, 'operador', 'operadores')} · ${plural(stats.fields, 'campo registado', 'campos registados')}`}
            leading={<IconTile icon="office-building-outline" tone="earth" />}
            onPress={() => navigation.navigate('CompanyDetail', { companyId: company.id })}
          />
        </>
      )}
      <SectionLabel title="Entidades geridas por este utilizador" />
      <KpiRow
        items={[
          { value: String(user.role === 'farmer' ? fields.length : 0), label: 'Campos' },
          { value: String(user.role === 'farmer' ? parcels.length : 0), label: 'Parcelas (QR)' },
          { value: String(tasks.length), label: user.role === 'farmer' ? 'Tarefas criadas' : 'Tarefas atribuídas' },
        ]}
      />
      <Notice
        title="Modo de visualização administrativa (ROOT)"
        message="A criação de operadores e edição de perfil cabe ao Agricultor."
        tone="info"
        icon="shield-account-outline"
      />
    </Screen>
  );
}
