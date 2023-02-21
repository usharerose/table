import useUrlState from '@ahooksjs/use-url-state';
import { Dashboard, IDashboard, ReadOnlyDashboard } from '@devtable/dashboard';
import { LoadingOverlay } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { observer } from 'mobx-react-lite';
import React from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { useParams } from 'react-router-dom';
import { DashboardAPI } from '../../api-caller/dashboard';
import { useDashboardDetailQuery } from '../../frames/app/models/dashboard-store';
import { useAccountContext } from '../../frames/require-auth/account-context';
import { ErrorBoundary } from '../../utils/error-boundary';
import './content.css';
import { DashboardRebaseWarning } from './dashboard-rebase-warning';

const _DashboardPageContent = ({ id }: { id: string }) => {
  const { mode } = useParams();
  const [search, setSearch] = useUrlState({
    full_screen_panel_id: '',
  });

  const { data: dashboardModel, loading, refresh } = useDashboardDetailQuery({ id });

  const [context] = React.useState({});

  const updateDashboard = React.useCallback(async (d: IDashboard) => {
    showNotification({
      id: 'for-updating',
      title: 'Pending',
      message: 'Updating dashboard...',
      loading: true,
    });
    await DashboardAPI.update(d);
    updateNotification({
      id: 'for-updating',
      title: 'Successful',
      message: 'This dashboard is updated',
      color: 'green',
    });
    refresh();
  }, []);

  const { canEdit } = useAccountContext();

  const setFullScreenPanelID = (id: string) => {
    const s = {
      ...search,
      full_screen_panel_id: id,
    };
    setSearch(s);
  };

  if (!dashboardModel) {
    return null;
  }

  const ready = !loading;
  const isDashboardEditable = canEdit && dashboardModel.isEditable;

  const inEditMode = mode === 'edit';
  const DashboardComponent = inEditMode && isDashboardEditable ? Dashboard : ReadOnlyDashboard;
  return (
    <div className="dashboard-page-content">
      {inEditMode && <DashboardRebaseWarning id={id} current={dashboardModel} />}
      <LoadingOverlay visible={!ready} exitTransitionDuration={0} />
      {ready && (
        <ErrorBoundary>
          <DashboardComponent
            context={context}
            dashboard={dashboardModel.dashboard}
            update={updateDashboard}
            config={{ apiBaseURL: import.meta.env.VITE_API_BASE_URL }}
            fullScreenPanelID={search.full_screen_panel_id}
            setFullScreenPanelID={setFullScreenPanelID}
          />
        </ErrorBoundary>
      )}
    </div>
  );
};
export const DashboardPageContent = observer(_DashboardPageContent);
