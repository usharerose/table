import _ from "lodash";
import { ContextInfoContextType } from "../contexts";
import { IDashboardDefinition, IDataSource } from "../types";
import { post } from "./request";

function formatSQL(sql: string, params: Record<string, any>) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  return new Function(...names, `return \`${sql}\`;`)(...vals);
};

function getSQLParams(context: ContextInfoContextType, definitions: IDashboardDefinition) {
  const sqlSnippetRecord = definitions.sqlSnippets.reduce((ret: Record<string, any>, curr) => {
    ret[curr.key] = formatSQL(curr.value, context)
    return ret;
  }, {})

  // sql snippets might use context, so context must be at a higher priority
  return _.merge({}, sqlSnippetRecord, context);
}

interface IQueryBySQL {
  context: ContextInfoContextType;
  definitions: IDashboardDefinition;
  title: string;
  dataSource: IDataSource;
}

export const queryBySQL = ({ context, definitions, title, dataSource: { type, key, sql } }: IQueryBySQL) => async () => {
  if (!sql) {
    return [];
  }
  const needParams = sql.includes('$');
  const params = getSQLParams(context, definitions);
  if (needParams && Object.keys(params).length === 0) {
    console.error(`[queryBySQL] insufficient params for {${title}}'s SQL`)
    return [];
  }
  const formattedSQL = formatSQL(sql, params);
  if (needParams) {
    console.groupCollapsed(`Final SQL for: ${title}`);
    console.log(formattedSQL);
    console.groupEnd();
  }
  const res = await post('/query', { type, key, sql: formattedSQL })
  return res;
}