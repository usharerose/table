import { ModalsProvider } from '@mantine/modals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoadFavicon } from './components/load-favicon';
import { AdminFrame } from './frames/admin';
import { App } from './frames/app';
import { DashboardEditorFrame } from './frames/dashboard-editor-frame';
import { RequireAuth } from './frames/require-auth';
import { SocketClientFrame } from './frames/socket-client-frame';
import './index.css';
import { AccountsPage } from './pages/account-page';
import { APIKeyPage } from './pages/api-key-page';
import { DashboardEditorPage } from './pages/dashboard-editor-page';
import { DashboardPage } from './pages/dashboard-page';
import { DataSourcePage } from './pages/data-source-page';
import { LoginPage } from './pages/login-page';
import { StatusPage } from './pages/status-page';
import('./utils/custom-monaco-editor-languages');

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ModalsProvider>
      <HelmetProvider>
        <Helmet>
          <title>@devtable</title>
        </Helmet>
        <LoadFavicon />

        <BrowserRouter basename={import.meta.env.VITE_WEBSITE_BASE_URL ?? ''}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<RequireAuth />}>
              <Route path="/" element={<SocketClientFrame />}>
                <Route path="/" element={<App />}>
                  <Route path="dashboard/:id" element={<DashboardPage />} />
                  <Route path="*" element={<DashboardPage />} />
                </Route>
                <Route path="/dashboard/:id/edit" element={<DashboardEditorFrame />}>
                  <Route path="" element={<DashboardEditorPage />} />
                </Route>
                <Route path="/admin" element={<AdminFrame />}>
                  <Route path="data_source/list" element={<DataSourcePage />} />
                  <Route path="account/list" element={<AccountsPage />} />
                  <Route path="api_key/list" element={<APIKeyPage />} />
                  <Route path="status" element={<StatusPage />} />
                  <Route path="*" element={<DataSourcePage />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </ModalsProvider>
  </React.StrictMode>,
);
