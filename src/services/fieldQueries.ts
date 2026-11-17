import { AppState, Parcel } from '../types/models';

export const findField = (state: AppState, fieldId: string) => state.fields.find((field) => field.id === fieldId);

export const findParcel = (state: AppState, parcelId: string | null) => state.parcels.find((parcel) => parcel.id === parcelId);

export const findParcelByQrCode = (state: AppState, qrCode: string) =>
  state.parcels.find((parcel) => parcel.qrCode.toLowerCase() === qrCode.trim().toLowerCase());

export const fieldsOfCompany = (state: AppState, companyId: string | null) =>
  state.fields.filter((field) => field.companyId === companyId);

export const parcelsOfField = (state: AppState, fieldId: string) => state.parcels.filter((parcel) => parcel.fieldId === fieldId);

export const activePlantation = (state: AppState, parcelId: string) =>
  state.plantations.find((plantation) => plantation.parcelId === parcelId && plantation.active);

export const cropTypesOfCompany = (state: AppState, companyId: string | null) =>
  state.cropTypes.filter((cropType) => cropType.companyId === companyId);

export const cropName = (state: AppState, cropTypeId: string) =>
  state.cropTypes.find((cropType) => cropType.id === cropTypeId)?.name ?? 'Cultivo removido';

export const parcelCrop = (state: AppState, parcel: Parcel) => {
  const plantation = activePlantation(state, parcel.id);
  return plantation ? cropName(state, plantation.cropTypeId) : 'Em pousio';
};

export const parcelLabel = (state: AppState, parcel: Parcel) => `${parcel.code} · ${parcelCrop(state, parcel)}`;

export const fieldStats = (state: AppState, fieldId: string) => {
  const parcels = parcelsOfField(state, fieldId);
  return {
    parcels: parcels.length,
    activePlantations: parcels.filter((parcel) => activePlantation(state, parcel.id)).length,
  };
};

export const activePlantationsOfCrop = (state: AppState, cropTypeId: string) =>
  state.plantations.filter((plantation) => plantation.cropTypeId === cropTypeId && plantation.active).length;

export const nextParcelCode = (state: AppState, fieldId: string) => `P${parcelsOfField(state, fieldId).length + 1}`;
