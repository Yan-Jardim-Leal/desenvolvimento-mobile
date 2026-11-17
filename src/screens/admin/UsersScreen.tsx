import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useAppNavigation } from '../../navigation/types';
import { matchesSearch, nonAdminUsers } from '../../services/userQueries';
import { UserRow } from '../../components/domain';
import { ChipGroup, EmptyState, IconButton, Screen, ScreenHeader, SearchBar } from '../../components/ui';

type RoleFilter = 'all' | 'farmer' | 'operator';

export function UsersScreen() {
  const navigation = useAppNavigation();
  const { state } = useData();
  const { signOut } = useAuth();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<RoleFilter>('all');
  const users = nonAdminUsers(state);
  const visible = users.filter((user) => (filter === 'all' || user.role === filter) && matchesSearch(user, query));

  return (
    <Screen header={<ScreenHeader overline="Administração" title="Utilizadores" right={<IconButton icon="logout" onPress={signOut} />} />}>
      <SearchBar value={query} onChangeText={setQuery} placeholder="Procurar por nome ou email" />
      <ChipGroup
        options={['all', 'farmer', 'operator'] as const}
        value={filter}
        onChange={setFilter}
        labels={{ all: `Todos · ${users.length}`, farmer: 'Agricultores', operator: 'Operadores' }}
      />
      {visible.map((user) => (
        <UserRow key={user.id} user={user} onPress={() => navigation.navigate('UserDetail', { userId: user.id })} />
      ))}
      {visible.length === 0 && <EmptyState message="Nenhum utilizador encontrado." />}
    </Screen>
  );
}
