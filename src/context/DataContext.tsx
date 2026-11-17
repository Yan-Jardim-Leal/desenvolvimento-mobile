import { createContext, ReactNode, useContext, useMemo, useReducer } from 'react';
import { AppState } from '../types/models';
import { initialState } from '../data/mocks';
import { reducer } from '../store/reducer';
import { AppActions, createActions } from '../store/createActions';

interface DataContextValue {
  state: AppState;
  actions: AppActions;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, actions: createActions(state, dispatch) }), [state]);
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData deve ser usado dentro de DataProvider');
  return context;
};
