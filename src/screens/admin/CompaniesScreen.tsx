import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAppNavigation } from '../../navigation/types';
import { companyMatchesSearch } from '../../services/companyQueries';
import { CompanyCard } from '../../components/domain';
import { EmptyState, Screen, ScreenHeader, SearchBar } from '../../components/ui';

export function CompaniesScreen() {
  const navigation = useAppNavigation();
  const { state } = useData();
  const [query, setQuery] = useState('');
  const visible = state.companies.filter((company) => companyMatchesSearch(company, query));

  return (
    <Screen header={<ScreenHeader overline={`Administração · ${state.companies.length} registadas`} title="Empresas" />}>
      <SearchBar value={query} onChangeText={setQuery} placeholder="Procurar por nome ou NIF" />
      {visible.map((company) => (
        <CompanyCard key={company.id} company={company} onPress={() => navigation.navigate('CompanyDetail', { companyId: company.id })} />
      ))}
      {visible.length === 0 && <EmptyState message="Nenhuma empresa encontrada." />}
    </Screen>
  );
}
