import React from 'react';
import { DashboardModelInstance } from '../dashboard-editor/model';
import { DashboardRenderModelInstance } from '~/dashboard-render/model/dashboard';

const ModelContext = React.createContext<DashboardModelInstance | DashboardRenderModelInstance | null>(null);

export const ModelContextProvider = ModelContext.Provider;

export function useModelContext<T = DashboardModelInstance>() {
  const model = React.useContext(ModelContext);
  if (!model) {
    throw new Error('Please use ModelContextProvider');
  }
  return model as T;
}

export const useEditModelContext = () => useModelContext<DashboardModelInstance>();
export const useRenderModelContext = () => useModelContext<DashboardRenderModelInstance>();
