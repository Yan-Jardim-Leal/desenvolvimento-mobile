import { NavigationProp, NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Role } from '../types/models';
import { AccountDraft } from '../types/forms';

export type AuthStackParams = {
  RoleSelect: undefined;
  Login: { role: Role };
  RegisterUser: undefined;
  RegisterCompany: { account: AccountDraft };
};

export type AppStackParams = {
  Tabs: NavigatorScreenParams<Record<string, undefined>> | undefined;
  UserDetail: { userId: string };
  CompanyDetail: { companyId: string };
  FieldDashboard: { fieldId: string };
  Parcel: { parcelId: string };
  Statistics: { parcelId: string };
  NewTask: { fieldId?: string; parcelId?: string };
  NewPlantation: { parcelId: string };
  CropTypes: undefined;
  ScannedParcel: { parcelId: string };
  CompleteTask: { taskId: string };
  Observation: { parcelId: string };
  EditProfile: undefined;
};

export type AuthScreenProps<T extends keyof AuthStackParams> = StackScreenProps<AuthStackParams, T>;

export type AppScreenProps<T extends keyof AppStackParams> = StackScreenProps<AppStackParams, T>;

export const useAppNavigation = () => useNavigation<NavigationProp<AppStackParams>>();
