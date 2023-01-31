import { defaults, get, isEqual, pick } from 'lodash';
import {
  addDisposer,
  applyPatch,
  applySnapshot,
  castToSnapshot,
  getSnapshot,
  Instance,
  onSnapshot,
  SnapshotIn,
  SnapshotOut,
  types,
} from 'mobx-state-tree';
import { AnyObject, IDashboard } from '../types';
import { ContextInfoType, ContextModel } from './context';
import { FiltersModel, getInitialFiltersPayload } from './filters';
import { MockContextModel } from './mock-context';
import { QueriesModel } from './queries';
import { SQLSnippetsModel } from './sql-snippets';

import { createDashboardViewsModel, ViewsModel } from './views';

const _DashboardModel = types
  .model({
    id: types.identifier,
    name: types.string,
    version: types.string,
    filters: FiltersModel,
    queries: QueriesModel,
    sqlSnippets: SQLSnippetsModel,
    views: ViewsModel,
    context: ContextModel,
    mock_context: MockContextModel,
    /**
     * this field should be excluded from snapshot
     */
    origin: types.maybe(types.frozen()),
  })
  .views((self) => ({
    get filtersChanged() {
      const fields = 'filters.current';
      return !isEqual(getSnapshot(get(self, fields)), get(self.origin, fields));
    },
    get queriesChanged() {
      const fields = 'queries.current';
      const snapshot = (getSnapshot(get(self, fields)) as AnyObject[]).map((it: $TSFixMe) =>
        pick(it, ['id', 'name', 'key', 'type', 'sql', 'run_by', 'pre_process', 'post_process']),
      );
      return !isEqual(snapshot, get(self.origin, fields));
    },
    get sqlSnippetsChanged() {
      const fields = 'sqlSnippets.current';
      return !isEqual(getSnapshot(get(self, fields)), get(self.origin, fields));
    },
    get viewsChanged() {
      const fields = 'views.current';
      return !isEqual(getSnapshot(get(self, fields)), get(self.origin, fields));
    },
    get mockContextChanged() {
      const fields = 'mock_context.current';
      return !isEqual(get(self, fields), get(self.origin, fields));
    },
  }))
  .views((self) => ({
    get payloadForSQL() {
      return {
        context: self.context.current,
        mock_context: self.mock_context.current,
        sqlSnippets: self.sqlSnippets.current,
        filterValues: self.filters.values,
      };
    },
    get changed() {
      return (
        self.filtersChanged ||
        self.queriesChanged ||
        self.sqlSnippetsChanged ||
        self.viewsChanged ||
        self.mockContextChanged
      );
    },
    get data() {
      const data = self.queries.current.map(({ id, data }) => ({ id, data }));
      return data.reduce((ret, curr) => {
        ret[curr.id] = curr.data;
        return ret;
      }, {} as Record<string, $TSFixMe[]>);
    },
    getDataStuffByID(queryID: string) {
      const q = self.queries.findByID(queryID);
      if (!q) {
        return {
          data: [],
          dataProxy: null,
          len: 0,
          state: 'idle',
          error: undefined,
        };
      }
      return {
        data: q.data.toJSON(),
        dataProxy: q.data,
        len: q.data.length,
        state: q.state,
        error: q.error,
      };
    },
    getDataStateByID(queryID: string) {
      return self.queries.findByID(queryID)?.state ?? [];
    },
    getDataErrorByID(queryID: string) {
      return self.queries.findByID(queryID)?.error ?? [];
    },
  }))
  .views((self) => ({
    findDependingPanels(queryID: string) {
      return self.views.current.flatMap((v) => v.panels.list.filter((p) => p.queryID === queryID).map((p) => p.title));
    },
  }))
  .actions((self) => {
    function setupAutoSave() {
      const filterPayloadKey = `dashboard-${self.id}-filters`;
      try {
        const storedValue = localStorage.getItem(filterPayloadKey);
        if (storedValue) {
          const storedFilters = JSON.parse(storedValue);
          applyPatch(self.filters, {
            op: 'replace',
            path: '/values',
            value: storedFilters,
          });
        }
      } catch (e) {
        console.log(e);
        // ignore
      }
      const autoSave = onSnapshot(self.filters, (snapshot) => {
        localStorage.setItem(filterPayloadKey, JSON.stringify(snapshot.values));
      });
      addDisposer(self, autoSave);
    }

    return {
      // FIXME: https://github.com/merico-dev/table/issues/440
      // afterCreate() {
      //   setupAutoSave();
      // },
      reset() {
        applySnapshot(self.filters.current, self.origin.filters.current);
        applySnapshot(self.queries.current, self.origin.queries.current);
        applySnapshot(self.sqlSnippets.current, self.origin.sqlSnippets.current);
        applySnapshot(self.views.current, self.origin.views.current);
        self.mock_context.current = self.origin.mock_context.current;
      },
      resetFilters() {
        applySnapshot(self.filters.current, self.origin.filters.current);
      },
    };
  });

type DashboardModelCreationType = SnapshotIn<Instance<typeof _DashboardModel>>;
type DashboardModelSnapshotType = SnapshotOut<Instance<typeof _DashboardModel>>;
export const DashboardModel = types.snapshotProcessor(_DashboardModel, {
  preProcessor(sn: DashboardModelCreationType): DashboardModelCreationType {
    return {
      ...sn,
      origin: sn,
    } as DashboardModelCreationType;
  },
  postProcessor(sn: DashboardModelSnapshotType): DashboardModelSnapshotType {
    delete sn.origin;
    // only preserve id, key, type, sql fields in sn.queries.current
    // or do we need to add postProcessor for QueryModel?
    const queries = castToSnapshot(sn.queries.current.map((q) => pick(q, ['id', 'key', 'type', 'sql'])));
    return defaults({}, { queries: { current: queries } }, sn);
  },
});

export function createDashboardModel(
  { id, name, version, filters, views, definition: { queries, sqlSnippets, mock_context = {} } }: IDashboard,
  context: ContextInfoType,
) {
  return DashboardModel.create({
    id,
    name,
    version,
    filters: getInitialFiltersPayload(filters),
    queries: {
      current: queries,
    },
    sqlSnippets: {
      current: sqlSnippets,
    },
    context: {
      current: context,
    },
    mock_context: {
      current: mock_context,
    },
    views: createDashboardViewsModel(views),
  });
}

export type DashboardModelInstance = Instance<typeof DashboardModel>;
