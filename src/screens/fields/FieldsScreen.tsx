import { StyleSheet, Text } from 'react-native';
import { useData } from '../../context/DataContext';
import { useAppNavigation } from '../../navigation/types';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { usePermissions } from '../../hooks/usePermissions';
import { findCompany } from '../../services/companyQueries';
import { fieldsOfCompany } from '../../services/fieldQueries';
import { formatArea, plural } from '../../utils/format';
import { FieldRow } from '../../components/domain';
import { EmptyState, IconButton, MapPlaceholder, Screen, ScreenHeader } from '../../components/ui';
import { colors, fontSize } from '../../theme';

export function FieldsScreen() {
  const navigation = useAppNavigation();
  const { state } = useData();
  const user = useCurrentUser();
  const { isAdmin, canManage } = usePermissions();
  const fields = isAdmin ? state.fields : fieldsOfCompany(state, user.companyId);
  const totalArea = fields.reduce((sum, field) => sum + field.areaHa, 0);
  const overline = isAdmin ? 'Administração' : `Empresa: ${findCompany(state, user.companyId)?.name ?? ''}`;

  return (
    <Screen
      header={
        <ScreenHeader
          overline={overline}
          title="Campos de cultivo"
          right={canManage && <IconButton icon="sprout-outline" filled onPress={() => navigation.navigate('CropTypes')} />}
        />
      }
    >
      <MapPlaceholder pins={fields.map((field) => field.name)} />
      <Text style={styles.summary}>
        {plural(fields.length, 'CAMPO', 'CAMPOS')} · {formatArea(totalArea).toUpperCase()}
      </Text>
      {fields.map((field) => (
        <FieldRow key={field.id} field={field} onPress={() => navigation.navigate('FieldDashboard', { fieldId: field.id })} />
      ))}
      {fields.length === 0 && <EmptyState message="Ainda não existem campos registados." />}
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: { textAlign: 'center', fontSize: fontSize.xs, fontWeight: '700', color: colors.muted, letterSpacing: 1 },
});
