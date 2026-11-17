import { useData } from '../../context/DataContext';
import { User } from '../../types/models';
import { findCompany } from '../../services/companyQueries';
import { roleLabel, roleTone } from '../../services/presentation';
import { Avatar, Badge, ListRow } from '../ui';

interface Props {
  user: User;
  subtitle?: 'company' | 'email';
  badge?: string;
  onPress?: () => void;
}

export function UserRow({ user, subtitle = 'company', badge, onPress }: Props) {
  const { state } = useData();
  const text = subtitle === 'email' ? user.email : findCompany(state, user.companyId)?.name;
  return (
    <ListRow
      title={user.name}
      subtitle={text}
      leading={<Avatar name={user.name} />}
      trailing={<Badge label={badge ?? roleLabel[user.role]} tone={badge ? 'earth' : roleTone[user.role]} />}
      onPress={onPress}
    />
  );
}
