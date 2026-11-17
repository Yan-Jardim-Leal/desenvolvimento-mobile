import { useData } from '../../context/DataContext';
import { Field } from '../../types/models';
import { fieldStats } from '../../services/fieldQueries';
import { formatArea, plural } from '../../utils/format';
import { Badge, IconTile, ListRow } from '../ui';

export function FieldRow({ field, onPress }: { field: Field; onPress: () => void }) {
  const { state } = useData();
  const { parcels } = fieldStats(state, field.id);
  return (
    <ListRow
      title={field.name}
      subtitle={`${field.city} · ${formatArea(field.areaHa)}`}
      leading={<IconTile icon="sprout-outline" />}
      trailing={<Badge label={plural(parcels, 'parcela', 'parcelas')} />}
      onPress={onPress}
    />
  );
}
