import { AppState, Company } from '../types/models';
import { usersOfCompany } from './userQueries';
import { fieldsOfCompany } from './fieldQueries';

export const findCompany = (state: AppState, companyId: string | null) =>
  state.companies.find((company) => company.id === companyId);

export const companyStats = (state: AppState, companyId: string) => {
  const fields = fieldsOfCompany(state, companyId);
  return {
    farmers: usersOfCompany(state, companyId, 'farmer').length,
    operators: usersOfCompany(state, companyId, 'operator').length,
    fields: fields.length,
    totalArea: fields.reduce((sum, field) => sum + field.areaHa, 0),
  };
};

export const companyMatchesSearch = (company: Company, query: string) =>
  `${company.name} ${company.nif.replace(/\s/g, '')}`.toLowerCase().includes(query.trim().toLowerCase().replace(/\s/g, ''));
