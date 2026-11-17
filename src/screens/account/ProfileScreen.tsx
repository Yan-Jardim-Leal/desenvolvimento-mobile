import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useAppNavigation } from '../../navigation/types';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { findCompany } from '../../services/companyQueries';
import { usersOfCompany } from '../../services/userQueries';
import { formatMonthYear } from '../../utils/date';
import { ProfileHeader } from '../../components/domain';
import { Button, Card, InfoRow, Screen, ScreenHeader, SectionLabel } from '../../components/ui';

export function ProfileScreen() {
  const navigation = useAppNavigation();
  const { state } = useData();
  const { signOut } = useAuth();
  const user = useCurrentUser();
  const company = findCompany(state, user.companyId);

  return (
    <Screen header={<ScreenHeader title="Perfil" />}>
      <ProfileHeader user={user} />
      <SectionLabel title="Dados pessoais" />
      <Card>
        <InfoRow label="Telemóvel" value={user.phone || '—'} />
        <InfoRow label="Membro desde" value={formatMonthYear(user.createdAt)} />
      </Card>
      {company && user.role === 'farmer' && (
        <>
          <SectionLabel title="Empresa" />
          <Card>
            <InfoRow label="Nome" value={company.name} />
            <InfoRow label="NIF" value={company.nif} />
            <InfoRow label="Morada" value={company.address} />
            <InfoRow label="Operadores" value={String(usersOfCompany(state, company.id, 'operator').length)} />
            <InfoRow label="Código da empresa" value={company.code} />
          </Card>
        </>
      )}
      <Button label="Editar dados" variant="secondary" onPress={() => navigation.navigate('EditProfile')} />
      <Button label="Terminar sessão" variant="danger" icon="logout" onPress={signOut} />
    </Screen>
  );
}
