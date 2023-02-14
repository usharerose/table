import { cast, detach, types } from 'mobx-state-tree';
import { downloadCSV, downloadDataListAsZip, makeCSV } from '../../utils/download';
import { QueryModel, QueryModelInstance } from './query';

export const QueriesModel = types
  .model('QueriesModel', {
    current: types.optional(types.array(QueryModel), []),
  })
  .views((self) => ({
    get firstID() {
      if (self.current.length === 0) {
        return undefined;
      }
      return self.current[0].id;
    },
    findByID(id: string) {
      return self.current.find((query) => query.id === id);
    },
    get options() {
      return self.current.map((d) => ({
        value: d.id,
        label: d.name,
      }));
    },
  }))
  .views((self) => ({
    get json() {
      return self.current.filter((o) => o.id).map((o) => o.json);
    },
  }))
  .actions((self) => {
    return {
      replace(current: Array<QueryModelInstance>) {
        self.current = cast(current);
      },
      append(item: QueryModelInstance) {
        self.current.push(item);
      },
      remove(index: number) {
        self.current.splice(index, 1);
      },
      replaceByIndex(index: number, replacement: QueryModelInstance) {
        self.current.splice(index, 1, replacement);
      },
      downloadAllData() {
        const idDataList = self.current.map(({ name, data }) => ({
          id: name,
          data: data.toJSON(),
        }));
        downloadDataListAsZip(idDataList);
      },
      downloadDataByQueryID(id: string) {
        const query = self.findByID(id);
        if (!query) {
          console.log(`[downloadDataByQueryID] query not found`);
          return;
        }
        const { name, data } = query;
        const csv = makeCSV(data);
        downloadCSV(name, csv);
      },
      refetchDataByQueryID(queryID: string) {
        const query = self.findByID(queryID);
        if (!query) {
          console.error(new Error(`[downloadDataByQueryID] query by ID[${queryID}] not found`));
          return;
        }
        return query.fetchData();
      },
      removeQuery(queryID: string) {
        const query = self.current.find((q) => q.id === queryID);
        if (query) {
          detach(query);
          self.current.remove(query);
        }
      },
    };
  });

export * from './query';
