import _ from 'lodash';
import { Instance, types } from 'mobx-state-tree';
import { CURRENT_SCHEMA_VERSION, FilterMeta, FilterMetaSnapshotOut } from '~/model';
import { downloadJSON } from '~/utils/download';
import { getValuesFromFilters } from './utils';

export const FiltersRenderModel = types
  .model('FiltersRenderModel', {
    current: types.optional(types.array(FilterMeta), []),
    values: types.optional(types.frozen(), {}),
  })
  .views((self) => ({
    get json() {
      return self.current.map((f) => f.json);
    },
    get firstID() {
      if (self.current.length === 0) {
        return undefined;
      }
      return self.current[0].id;
    },
    findByID(id: string) {
      return self.current.find((f) => f.id === id);
    },
    findByIDSet(idset: Set<string>) {
      return self.current.filter((f) => idset.has(f.id));
    },
    get inOrder() {
      return _.sortBy(self.current, 'order');
    },
    get empty() {
      return self.current.length === 0;
    },
    visibleInView(viewID: string) {
      return _.sortBy(
        self.current.filter((f) => f.visibleInViewsIDSet.has(viewID)),
        'order',
      );
    },
    get firstFilterValueKey() {
      return Object.keys(self.values)[0] ?? '';
    },
    get keySet() {
      return new Set(self.current.map((o) => o.key));
    },
    get keyLabelMap() {
      return self.current.reduce((ret, f) => {
        ret[f.key] = f.label;
        return ret;
      }, {} as Record<string, string>);
    },
    getSelectOption(id: string) {
      const filter = this.findByID(id);
      if (!filter || !('getSelectOption' in filter.config)) {
        return null;
      }

      const value = self.values[filter.key];
      return filter.config.getSelectOption(value);
    },
  }))
  .actions((self) => ({
    setValues(values: Record<string, $TSFixMe>) {
      self.values = values;
    },
    setValueByKey(key: string, value: $TSFixMe) {
      self.values = {
        ...self.values,
        [key]: value,
      };
    },
    getValueByKey(key: string) {
      return self.values[key];
    },

    getSchema(ids: string[], raw?: boolean) {
      const filters = self.findByIDSet(new Set(ids));

      const ret = {
        filters: filters.map((f) => ({ ...f.json, visibleInViewsIDs: raw ? f.json.visibleInViewsIDs : [] })),
        version: CURRENT_SCHEMA_VERSION,
      };
      return ret;
    },
    downloadSchema(ids: string[]) {
      const schema = JSON.stringify(this.getSchema(ids, false), null, 2);
      const filename = 'Filters';
      downloadJSON(filename, schema);
    },
  }));
export type FiltersRenderModelInstance = Instance<typeof FiltersRenderModel>;

export function getInitialFiltersConfig(filters: FilterMetaSnapshotOut[]) {
  return {
    current: filters,
    values: getValuesFromFilters(filters),
  };
}
