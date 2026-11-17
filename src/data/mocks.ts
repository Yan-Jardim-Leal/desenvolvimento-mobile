import { AppState, Parcel, Plantation, Sensors } from '../types/models';
import { daysFromNow, minutesAgo } from '../utils/date';

const DEMO_PASSWORD = '123456';

const parcel = (id: string, fieldId: string, code: string, areaHa: number, sensors: Sensors): Parcel => ({
  id,
  fieldId,
  code,
  areaHa,
  qrCode: `${code}-${fieldId.toUpperCase()}-${id.slice(-4).toUpperCase()}`,
  sensors,
});

const plantation = (
  id: string,
  parcelId: string,
  cropTypeId: string,
  plantedInDays: number,
  harvestInDays: number,
  status: Plantation['status'],
): Plantation => ({
  id,
  parcelId,
  cropTypeId,
  plantedAt: daysFromNow(plantedInDays),
  harvestAt: daysFromNow(harvestInDays),
  status,
  notes: '',
  active: true,
});

export const initialState: AppState = {
  // Dados gerados com IA
  companies: [
    { id: 'c1', name: 'Quinta do Vale, Lda.', nif: '514 208 337', city: 'Mirandela', address: 'Rua da Ribeira 14, Mirandela', postalCode: '5370-210', phone: '+351 273 421 890', code: '12af57' },
    { id: 'c2', name: 'Herdade do Azibo, S.A.', nif: '509 771 204', city: 'Macedo de Cavaleiros', address: 'Largo do Azibo 3, Macedo de Cavaleiros', postalCode: '5340-201', phone: '+351 278 410 220', code: 'a7c201' },
    { id: 'c3', name: 'Agro Sabor, Unip. Lda.', nif: '516 330 918', city: 'Torre de Moncorvo', address: 'Rua do Sabor 22, Torre de Moncorvo', postalCode: '5160-230', phone: '+351 279 250 118', code: 'f3d9e0' },
  ],
  users: [
    { id: 'u0', name: 'Administrador', email: 'admin@farmipb.pt', password: DEMO_PASSWORD, phone: '+351 273 300 000', role: 'admin', companyId: null, location: 'Bragança', createdAt: '2026-01-05' },
    { id: 'u1', name: 'Ana Martins', email: 'ana.martins@quintadovale.pt', password: DEMO_PASSWORD, phone: '+351 912 345 678', role: 'farmer', companyId: 'c1', location: 'Mirandela, Bragança', createdAt: '2026-03-10' },
    { id: 'u2', name: 'Rui Fernandes', email: 'rui.fernandes@quintadovale.pt', password: DEMO_PASSWORD, phone: '+351 913 220 410', role: 'operator', companyId: 'c1', location: 'Mirandela, Bragança', createdAt: '2026-03-15' },
    { id: 'u3', name: 'Marta Lopes', email: 'marta.lopes@quintadovale.pt', password: DEMO_PASSWORD, phone: '+351 914 881 207', role: 'operator', companyId: 'c1', location: 'Mirandela, Bragança', createdAt: '2026-03-18' },
    { id: 'u4', name: 'Tiago Reis', email: 'tiago.reis@quintadovale.pt', password: DEMO_PASSWORD, phone: '+351 915 102 334', role: 'operator', companyId: 'c1', location: 'Vila Flor, Bragança', createdAt: '2026-04-02' },
    { id: 'u5', name: 'João Pires', email: 'joao.pires@azibo.pt', password: DEMO_PASSWORD, phone: '+351 916 440 902', role: 'farmer', companyId: 'c2', location: 'Macedo de Cavaleiros, Bragança', createdAt: '2026-02-14' },
    { id: 'u6', name: 'Carla Nunes', email: 'carla.nunes@azibo.pt', password: DEMO_PASSWORD, phone: '+351 917 330 815', role: 'operator', companyId: 'c2', location: 'Macedo de Cavaleiros, Bragança', createdAt: '2026-02-20' },
    { id: 'u7', name: 'Paulo Teixeira', email: 'paulo.teixeira@agrosabor.pt', password: DEMO_PASSWORD, phone: '+351 918 205 671', role: 'farmer', companyId: 'c3', location: 'Torre de Moncorvo, Bragança', createdAt: '2026-04-11' },
  ],
  fields: [
    { id: 'f1', companyId: 'c1', name: 'Vale da Ribeira', city: 'Mirandela', region: 'Bragança', areaHa: 12.4, coordinates: '41,487° N · 7,182° O' },
    { id: 'f2', companyId: 'c1', name: 'Encosta Norte', city: 'Vila Flor', region: 'Bragança', areaHa: 9.8, coordinates: '41,307° N · 7,153° O' },
    { id: 'f3', companyId: 'c1', name: 'Lameiro', city: 'Mirandela', region: 'Bragança', areaHa: 5.7, coordinates: '41,492° N · 7,170° O' },
    { id: 'f4', companyId: 'c2', name: 'Azibo Sul', city: 'Macedo de Cavaleiros', region: 'Bragança', areaHa: 15.0, coordinates: '41,553° N · 6,957° O' },
    { id: 'f5', companyId: 'c3', name: 'Vinha Velha', city: 'Torre de Moncorvo', region: 'Bragança', areaHa: 6.1, coordinates: '41,174° N · 7,051° O' },
  ],
  parcels: [
    parcel('p0001', 'f1', 'P1', 2.8, { humidity: 38, temperature: 18.9, light: 690, ph: 6.3 }),
    parcel('p0002', 'f1', 'P2', 2.1, { humidity: 44, temperature: 18.1, light: 705, ph: 6.6 }),
    parcel('p0003', 'f1', 'P3', 2.4, { humidity: 41, temperature: 18.4, light: 720, ph: 6.5 }),
    parcel('p0004', 'f1', 'P4', 1.9, { humidity: 35, temperature: 19.2, light: 740, ph: 6.4 }),
    parcel('p0005', 'f1', 'P5', 1.6, { humidity: 29, temperature: 19.8, light: 760, ph: 6.9 }),
    parcel('p0006', 'f1', 'P6', 1.6, { humidity: 33, temperature: 19.0, light: 710, ph: 6.2 }),
    parcel('p0007', 'f2', 'P1', 3.1, { humidity: 47, temperature: 16.9, light: 610, ph: 6.1 }),
    parcel('p0008', 'f2', 'P2', 2.6, { humidity: 51, temperature: 16.4, light: 590, ph: 6.0 }),
    parcel('p0009', 'f2', 'P3', 2.2, { humidity: 45, temperature: 17.2, light: 630, ph: 6.4 }),
    parcel('p0010', 'f2', 'P4', 1.9, { humidity: 40, temperature: 17.5, light: 650, ph: 6.7 }),
    parcel('p0011', 'f3', 'P1', 2.0, { humidity: 55, temperature: 17.8, light: 600, ph: 6.8 }),
    parcel('p0012', 'f3', 'P2', 1.9, { humidity: 52, temperature: 17.6, light: 615, ph: 6.6 }),
    parcel('p0013', 'f3', 'P3', 1.8, { humidity: 49, temperature: 18.0, light: 620, ph: 6.5 }),
    parcel('p0014', 'f4', 'P1', 7.5, { humidity: 42, temperature: 18.2, light: 680, ph: 6.3 }),
    parcel('p0015', 'f4', 'P2', 7.5, { humidity: 39, temperature: 18.6, light: 700, ph: 6.2 }),
    parcel('p0016', 'f5', 'P1', 6.1, { humidity: 36, temperature: 19.4, light: 730, ph: 6.9 }),
  ],
  cropTypes: [
    { id: 'ct1', companyId: 'c1', name: 'Batata', cycleDays: 110 },
    { id: 'ct2', companyId: 'c1', name: 'Cebola', cycleDays: 125 },
    { id: 'ct3', companyId: 'c1', name: 'Cenoura', cycleDays: 90 },
    { id: 'ct4', companyId: 'c1', name: 'Alface', cycleDays: 60 },
    { id: 'ct5', companyId: 'c1', name: 'Tomate', cycleDays: 100 },
    { id: 'ct6', companyId: 'c2', name: 'Batata', cycleDays: 110 },
    { id: 'ct7', companyId: 'c3', name: 'Castanha', cycleDays: 180 },
  ],
  plantations: [
    plantation('pl1', 'p0001', 'ct1', -60, 30, 'Crescimento'),
    plantation('pl2', 'p0002', 'ct2', -10, 115, 'Semeada'),
    plantation('pl3', 'p0003', 'ct2', -48, 77, 'Crescimento'),
    plantation('pl4', 'p0004', 'ct3', -70, 20, 'Floração'),
    plantation('pl5', 'p0006', 'ct1', -105, 5, 'Pronta'),
    plantation('pl6', 'p0007', 'ct1', -30, 80, 'Crescimento'),
    plantation('pl7', 'p0009', 'ct4', -20, 40, 'Crescimento'),
    plantation('pl8', 'p0011', 'ct5', -40, 60, 'Floração'),
    plantation('pl9', 'p0014', 'ct6', -50, 60, 'Crescimento'),
    plantation('pl10', 'p0016', 'ct7', -90, 90, 'Floração'),
  ],
  tasks: [
    { id: 't1', type: 'Regar', target: 'parcel', fieldId: 'f1', parcelId: 'p0003', operatorId: 'u2', dueDate: daysFromNow(0), dueTime: '18:00', status: 'pending', observation: '', completedAt: null },
    { id: 't2', type: 'Colocar adubo', target: 'parcel', fieldId: 'f1', parcelId: 'p0001', operatorId: 'u3', dueDate: daysFromNow(0), dueTime: '16:00', status: 'in_progress', observation: '', completedAt: null },
    { id: 't3', type: 'Semear', target: 'parcel', fieldId: 'f2', parcelId: 'p0008', operatorId: 'u2', dueDate: daysFromNow(2), dueTime: '12:00', status: 'pending', observation: '', completedAt: null },
    { id: 't4', type: 'Regar', target: 'field', fieldId: 'f3', parcelId: null, operatorId: 'u4', dueDate: daysFromNow(-1), dueTime: '18:00', status: 'done', observation: 'Rega uniforme em todo o campo.', completedAt: minutesAgo(60 * 20) },
    { id: 't5', type: 'Monda manual', target: 'parcel', fieldId: 'f1', parcelId: 'p0003', operatorId: 'u2', dueDate: daysFromNow(-1), dueTime: '17:00', status: 'done', observation: 'Sem infestantes relevantes.', completedAt: minutesAgo(60 * 22) },
    { id: 't6', type: 'Colocar adubo', target: 'parcel', fieldId: 'f1', parcelId: 'p0003', operatorId: 'u2', dueDate: daysFromNow(1), dueTime: '10:00', status: 'pending', observation: '', completedAt: null },
  ],
  alerts: [
    { id: 'a1', userId: 'u1', title: 'Tarefa concluída', message: 'Rui Fernandes concluiu "Monda manual" na Parcela P3 do Vale da Ribeira.', createdAt: minutesAgo(12), read: false },
    { id: 'a2', userId: 'u1', title: 'Estado da plantação atualizado', message: 'Cebola na Parcela P3 passou para "Crescimento".', createdAt: minutesAgo(60), read: false },
    { id: 'a3', userId: 'u1', title: 'Nova observação', message: 'Marta Lopes registou: solo húmido, sem pragas visíveis (P1).', createdAt: minutesAgo(60 * 5), read: true },
    { id: 'a4', userId: 'u1', title: 'Colheita a aproximar-se', message: 'Batata na Parcela P6 tem colheita prevista para breve.', createdAt: minutesAgo(60 * 26), read: true },
    { id: 'a5', userId: 'u2', title: 'Nova tarefa atribuída', message: 'Ana Martins atribuiu-lhe "Regar" na Parcela P3 do Vale da Ribeira.', createdAt: minutesAgo(5), read: false },
    { id: 'a6', userId: 'u2', title: 'Nova tarefa atribuída', message: '"Semear" na Parcela P2 da Encosta Norte.', createdAt: minutesAgo(60 * 3), read: true },
    { id: 'a7', userId: 'u2', title: 'Tarefa a terminar', message: '"Colocar adubo" na Parcela P3 termina amanhã às 10:00.', createdAt: minutesAgo(60 * 4), read: true },
  ],
};

export const demoCredentials = {
  admin: { email: 'admin@farmipb.pt', password: DEMO_PASSWORD, companyCode: '' },
  farmer: { email: 'ana.martins@quintadovale.pt', password: DEMO_PASSWORD, companyCode: '' },
  operator: { email: 'rui.fernandes@quintadovale.pt', password: DEMO_PASSWORD, companyCode: '12af57' },
};
