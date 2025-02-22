import { Box } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { useCreation, useRequest } from 'ahooks';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { listDataSources, listGlobalSQLSnippets } from '~/api-caller';
import { PluginContext, createPluginContext } from '~/components/plugins';
import { ServiceLocatorProvider } from '~/components/plugins/service/service-locator/use-service-locator';
import { DashboardViewRender } from '~/components/view';
import { DashboardThemeContextProvider, FullScreenPanelContext } from '~/contexts';
import { useInteractionOperationHacks } from '~/interactions/temp-hack';
import { ContextRecordType } from '~/model';
import { registerThemes } from '~/styles/register-themes';
import { IDashboardConfig } from '..';
import { configureAPIClient } from '../api-caller/request';
import { useTopLevelServices } from '../components/plugins/service/use-top-level-services';
import { DashboardContentDBType, IDashboard } from '../types/dashboard';
import './dashboard-render.css';
import { createDashboardRenderModel } from './model';
import { registerECharts } from '~/utils';
import { useTranslation } from 'react-i18next';
import {
  DatesProvider,
  ContentModelContextProvider,
  DashboardModelContextProvider,
  LayoutStateContext,
} from '~/contexts';
import { I18nextContextProvider } from '~/i18n';

registerThemes();
registerECharts();

interface IReadOnlyDashboard {
  context: ContextRecordType;
  dashboard: IDashboard;
  content: DashboardContentDBType;
  className?: string;
  config: IDashboardConfig;
  fullScreenPanelID: string;
  setFullScreenPanelID: (v: string) => void;
  filterValues?: Record<string, any>;
  onFilterValuesChange?: (filterValues: Record<string, any>) => void;
  lang: string;
}

const _ReadOnlyDashboard = ({
  context,
  dashboard,
  content,
  className = 'dashboard',
  config,
  fullScreenPanelID,
  setFullScreenPanelID,
  filterValues,
  onFilterValuesChange,
  lang,
}: IReadOnlyDashboard) => {
  configureAPIClient(config);

  const { data: datasources = [] } = useRequest(listDataSources);
  const { data: globalSQLSnippets = [] } = useRequest(listGlobalSQLSnippets);

  const model = React.useMemo(
    () => createDashboardRenderModel(dashboard, content, datasources, globalSQLSnippets, context, filterValues ?? {}),
    [dashboard, content],
  );
  useInteractionOperationHacks(model.content, false);

  React.useEffect(() => {
    model.context.replace(context);
  }, [context]);

  React.useEffect(() => {
    model.datasources.replace(datasources);
  }, [datasources]);

  React.useEffect(() => {
    model.globalSQLSnippets.replace(globalSQLSnippets);
  }, [globalSQLSnippets]);

  React.useEffect(() => {
    onFilterValuesChange?.(model.content.filters.values);
  }, [onFilterValuesChange, model.content.filters.values]);

  React.useEffect(() => {
    if (filterValues) {
      model.content.filters.patchValues(filterValues);
    }
  }, [filterValues, model.content.filters.patchValues]);

  const pluginContext = useCreation(createPluginContext, []);
  const configureServices = useTopLevelServices(pluginContext);
  return (
    <I18nextContextProvider lang={lang}>
      <ModalsProvider>
        <DatesProvider>
          <DashboardThemeContextProvider value={{ searchButtonProps: config.searchButtonProps }}>
            <DashboardModelContextProvider value={model}>
              <ContentModelContextProvider value={model.content}>
                <FullScreenPanelContext.Provider
                  value={{
                    fullScreenPanelID,
                    setFullScreenPanelID,
                  }}
                >
                  <LayoutStateContext.Provider
                    value={{
                      inEditMode: false,
                    }}
                  >
                    <Box className={`${className} dashboard-root`}>
                      <PluginContext.Provider value={pluginContext}>
                        <ServiceLocatorProvider configure={configureServices}>
                          {model.content.views.visibleViews.map((view) => (
                            <DashboardViewRender key={view.id} view={view} />
                          ))}
                        </ServiceLocatorProvider>
                      </PluginContext.Provider>
                    </Box>
                  </LayoutStateContext.Provider>
                </FullScreenPanelContext.Provider>
              </ContentModelContextProvider>
            </DashboardModelContextProvider>
          </DashboardThemeContextProvider>
        </DatesProvider>
      </ModalsProvider>
    </I18nextContextProvider>
  );
};

export const ReadOnlyDashboard = observer(_ReadOnlyDashboard);
