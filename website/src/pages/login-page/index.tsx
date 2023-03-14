import { ILoginResp, Login } from '@devtable/settings-form';
import { Center, LoadingOverlay } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useRequest } from 'ahooks';
import { Navigate, useNavigate } from 'react-router-dom';
import { AccountAPI } from '../../api-caller/account';
import { SettingsFormConfig } from '../../utils/config';

export function LoginPage() {
  const navigate = useNavigate();
  const { data: account, loading, ...rest } = useRequest(AccountAPI.get);

  const redirect_to = window.localStorage.getItem('redirect_to') ?? '/dashboard/';

  const onSuccess = ({ account, token }: ILoginResp) => {
    window.localStorage.setItem('token', token);
    navigate(redirect_to);
  };

  if (account) {
    return <Navigate to={redirect_to} replace />;
  }

  return (
    <NotificationsProvider position="top-right">
      <Center sx={{ width: '100vw', height: '100vh' }}>
        <LoadingOverlay visible={loading} />
        <Login config={SettingsFormConfig} onSuccess={onSuccess} />
      </Center>
    </NotificationsProvider>
  );
}
