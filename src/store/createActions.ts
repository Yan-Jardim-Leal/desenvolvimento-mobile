import { Dispatch } from 'react';
import { AppState, User } from '../types/models';
import { AccountDraft, CompanyDraft, CompletionReport, PlantationDraft, TaskDraft } from '../types/forms';
import { createId } from '../utils/format';
import { isValidIsoDate, today } from '../utils/date';
import { usersOfCompany } from '../services/userQueries';
import { activePlantation, findParcel, nextParcelCode } from '../services/fieldQueries';
import { findTask, taskLocation } from '../services/taskQueries';
import { Action } from './actions';

const newUser = (account: AccountDraft, role: User['role'], companyId: string, location: string): User => ({
  id: createId('u'),
  ...account,
  phone: '',
  role,
  companyId,
  location,
  createdAt: today(),
});

const randomCompanyCode = () => Math.random().toString(16).slice(2, 8);

export const createActions = (state: AppState, dispatch: Dispatch<Action>) => {
  const notify = (userId: string, title: string, message: string) =>
    dispatch({
      type: 'alert/added',
      alert: { id: createId('a'), userId, title, message, createdAt: new Date().toISOString(), read: false },
    });

  const notifyFarmers = (companyId: string | null, title: string, message: string) =>
    usersOfCompany(state, companyId, 'farmer').forEach((farmer) => notify(farmer.id, title, message));

  return {
    registerFarmer(account: AccountDraft, draft: CompanyDraft) {
      const companyId = createId('c');
      const city = draft.address.split(',').pop()?.trim() ?? '';
      dispatch({ type: 'company/added', company: { id: companyId, ...draft, city, phone: '', code: randomCompanyCode() } });
      const user = newUser(account, 'farmer', companyId, city);
      dispatch({ type: 'user/added', user });
      return user;
    },

    updateProfile(userId: string, changes: Pick<User, 'name' | 'phone'>) {
      dispatch({ type: 'user/updated', userId, changes });
    },

    addOperator(farmer: User, account: AccountDraft) {
      dispatch({ type: 'user/added', user: newUser(account, 'operator', farmer.companyId ?? '', farmer.location) });
    },

    addCropType(companyId: string, name: string, cycleDays: number) {
      dispatch({ type: 'cropType/added', cropType: { id: createId('ct'), companyId, name, cycleDays } });
    },

    removeCropType(cropTypeId: string) {
      dispatch({ type: 'cropType/removed', cropTypeId });
    },

    addParcel(fieldId: string) {
      const id = createId('p');
      const code = nextParcelCode(state, fieldId);
      const parcel = {
        id,
        fieldId,
        code,
        areaHa: 1,
        qrCode: `${code}-${fieldId.toUpperCase()}-${id.slice(-4).toUpperCase()}`,
        sensors: { humidity: 40, temperature: 18, light: 700, ph: 6.5 },
      };
      dispatch({ type: 'parcel/added', parcel });
      return parcel;
    },

    addPlantation(draft: PlantationDraft) {
      dispatch({ type: 'plantation/added', plantation: { id: createId('pl'), ...draft, status: 'Semeada', active: true } });
    },

    assignTask(draft: TaskDraft, assignedBy: User) {
      const task = { id: createId('t'), ...draft, status: 'pending' as const, observation: '', completedAt: null };
      dispatch({ type: 'task/added', task });
      notify(draft.operatorId, 'Nova tarefa atribuída', `${assignedBy.name} atribuiu-lhe "${draft.type}" em ${taskLocation(state, task)}.`);
    },

    startTask(taskId: string) {
      dispatch({ type: 'task/updated', taskId, changes: { status: 'in_progress' } });
    },

    completeTask(taskId: string, report: CompletionReport, operator: User) {
      const task = findTask(state, taskId);
      if (!task) return;
      dispatch({
        type: 'task/updated',
        taskId,
        changes: { status: 'done', observation: report.observation, completedAt: new Date().toISOString() },
      });
      const plantation = task.parcelId ? activePlantation(state, task.parcelId) : undefined;
      if (plantation) {
        const ended = report.plantStatus === 'Pousio' || report.harvest === 'Colhida';
        dispatch({
          type: 'plantation/updated',
          plantationId: plantation.id,
          changes: {
            active: !ended,
            status: report.plantStatus === 'Pousio' ? plantation.status : report.plantStatus,
            harvestAt: isValidIsoDate(report.harvestAt) ? report.harvestAt : plantation.harvestAt,
          },
        });
      }
      notifyFarmers(operator.companyId, 'Tarefa concluída', `${operator.name} concluiu "${task.type}" em ${taskLocation(state, task)}.`);
    },

    addObservation(parcelId: string, author: User, text: string) {
      const parcel = findParcel(state, parcelId);
      notifyFarmers(author.companyId, 'Nova observação', `${author.name} registou: ${text} (${parcel?.code ?? ''}).`);
    },

    readAlert(alertId: string) {
      dispatch({ type: 'alert/read', alertId });
    },
  };
};

export type AppActions = ReturnType<typeof createActions>;
