import { AppShell, MantineProvider } from '@mantine/core';
import { Header } from '../components/header';
import { DashboardDemo } from './dashboard-demo';
import { useParams } from 'react-router-dom';
import { NotificationsProvider } from '@mantine/notifications';
import '@devtable/dashboard/dist/style.css';
import './index.css'

function App() {
  const { id } = useParams()
  return (
    <AppShell
      padding="md"
      header={<Header />}
      styles={{
        root: {
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        },
        body: {
          flexGrow: 1,
        },
        main: {
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }
      }}
    >
      <MantineProvider>
        <NotificationsProvider>
          {id && <DashboardDemo id={id} />}
        </NotificationsProvider>
      </MantineProvider>
    </AppShell>
  )
}

export default App
