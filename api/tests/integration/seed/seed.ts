import bcrypt from 'bcrypt';
import { dashboardDataSource } from '~/data_sources/dashboard';
import { SALT_ROUNDS } from '~/utils/constants';
import { accounts, apiKeys, dataSources, dashboards } from '../constants';
import Account from '~/models/account';
import ApiKey from '~/models/apiKey';
import DataSource from '~/models/datasource';
import Dashboard from '~/models/dashboard';
import { maybeEncryptPassword } from '~/utils/encryption';
import DashboardPermission from '~/models/dashboard_permission';

export async function seed() {
  if (!dashboardDataSource.isInitialized) {
    await dashboardDataSource.initialize();
  }
  await dashboardDataSource.runMigrations({ transaction: 'none' });
  await addAccounts();
  await addApiKeys();
  await addDataSources();
  await addDashboards();
}

async function addAccounts() {
  const accountRepo = dashboardDataSource.getRepository(Account);
  await accountRepo.clear();
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    account.password = await bcrypt.hash(account.name, SALT_ROUNDS);
    await accountRepo.save(account);
  }
}

async function addApiKeys() {
  const apikeyRepo = dashboardDataSource.getRepository(ApiKey);
  for (let i = 0; i < apiKeys.length; i++) {
    const apikey = apiKeys[i];
    await apikeyRepo.save(apikey);
  }
}

async function addDataSources() {
  const datasourceRepo = dashboardDataSource.getRepository(DataSource);
  for (let i = 0; i < dataSources.length; i++) {
    const datasource = dataSources[i];
    maybeEncryptPassword(datasource.config);
    await datasourceRepo.save(datasource);
  }
}

async function addDashboards() {
  const superadmin = accounts[4];
  const author = accounts[2];
  const dashboardRepo = dashboardDataSource.getRepository(Dashboard);
  const dashboardPermissionRepo = dashboardDataSource.getRepository(DashboardPermission);
  for (let i = 0; i < dashboards.length; i++) {
    const dashboard = dashboards[i];
    await dashboardRepo.save(dashboard);
    const dashboardPermission = new DashboardPermission();
    dashboardPermission.id = dashboard.id;
    dashboardPermission.owner_id = dashboard.is_preset ? superadmin.id : author.id;
    dashboardPermission.owner_type = 'ACCOUNT';
    await dashboardPermissionRepo.save(dashboardPermission);
  }
}
