import _ from 'lodash';
import { ContextInfoContextType, FilterValuesContextType } from '../contexts';
import { IDashboardDefinition, ISQLSnippet } from '../types';

export function explainSQLSnippet(snippet: string, context: ContextInfoContextType) {
  const names = Object.keys(context);
  const vals = Object.values(context);
  try {
    return new Function(...names, `return \`${snippet}\`;`)(...vals);
  } catch (error: any) {
    console.error(error);
    return error.message;
  }
}

export function formatSQL(sql: string, params: Record<string, any>) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  try {
    return new Function(...names, `return \`${sql}\`;`)(...vals);
  } catch (error) {
    if (names.length === 0 && sql.includes('$')) {
      throw new Error('[formatSQL] insufficient params');
    }
    throw error;
  }
}

export function getSQLParams(
  context: ContextInfoContextType,
  definitions: IDashboardDefinition,
  filterValues: FilterValuesContextType,
) {
  const sqlSnippetRecord = definitions.sqlSnippets.reduce((ret: Record<string, any>, curr) => {
    ret[curr.key] = formatSQL(curr.value, context);
    return ret;
  }, {});

  // sql snippets might use context, so context must be at a higher priority
  return _.merge({}, sqlSnippetRecord, context, { filters: filterValues });
}

export function explainSQL(
  sql: string,
  context: ContextInfoContextType,
  definitions: IDashboardDefinition,
  filterValues: FilterValuesContextType,
) {
  try {
    const params = getSQLParams(context, definitions, filterValues);
    return formatSQL(sql, params);
  } catch (error: any) {
    console.error(error);
    return error.message;
  }
}
