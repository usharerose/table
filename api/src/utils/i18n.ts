import { I18n } from 'i18n';
import path from 'path';
import { DEFAULT_LANGUAGE } from './constants';

const i18n = new I18n({
  locales: [DEFAULT_LANGUAGE, 'zh'],
  directory: path.join(__dirname, '../locales'),
  defaultLocale: DEFAULT_LANGUAGE
});

type ACCOUNT_KEYS = 
  'ACCOUNT_NO_DELETE_SELF' |
  'ACCOUNT_NO_EDIT_SELF' |
  'ACCOUNT_NO_ADD_SIMILAR_OR_HIGHER_PRIVILEGES' |
  'ACCOUNT_INVALID_CREDENTIALS' |
  'ACCOUNT_NO_EDIT_SUPERADMIN' |
  'ACCOUNT_NO_EDIT_SIMILAR_OR_HIGHER_PRIVILEGES' |
  'ACCOUNT_NO_CHANGE_SIMILAR_OR_HIGHER_PRIVILEGES' |
  'ACCOUNT_NO_EMPTY_RESET_PASSWORD' |
  'ACCOUNT_NO_DELETE_SIMILAR_OR_HIGHER_PRIVILEGES';

type DATASOURCE_KEYS = 
  'DATASOURCE_HTTP_REQUIRED_FIELDS' |
  'DATASOURCE_DB_REQUIRED_FIELDS' |
  'DATASOURCE_RENAME_SAME_KEY' |
  'DATASOURCE_NO_DELETE_PRESET' | 
  'DATASOURCE_CONNECTION_TEST_FAILED';

type AUTH_KEYS = 
  'AUTH_NOT_ENABLED' |
  'AUTH_MUST_BEARER';

type APIKEY_KEYS =
  'APIKEY_NO_DELETE_PRESET';

type CONFIG_KEYS =
  'CONFIG_REQUIRES_AUTHENTICATION' |
  'CONFIG_INCORRECT_VALUE';

type DASHBOARD_KEYS =
  'DASHBOARD_EDIT_REQUIRES_SUPERADMIN' |
  'DASHBOARD_DELETE_PRESET_REQUIRES_SUPERADMIN';

type PERMISSION_KEYS = 
  'UNAUTHORIZED' |
  'FORBIDDEN';

type LANGUAGE_KEYS = 
  ACCOUNT_KEYS |
  DATASOURCE_KEYS |
  AUTH_KEYS |
  APIKEY_KEYS |
  CONFIG_KEYS |
  DASHBOARD_KEYS |
  PERMISSION_KEYS;

export function translate(key: LANGUAGE_KEYS, locale: string): string {
  return i18n.__({ phrase: key, locale });
}

export default i18n;