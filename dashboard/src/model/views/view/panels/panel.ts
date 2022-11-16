import { getRoot, Instance, resolveIdentifier, types } from 'mobx-state-tree';
import { QueryModel } from '../../../queries';
import { PanelLayoutModel } from './layout';
import { PanelStyleModel } from './style';
import { PanelVizModel } from './viz';

export const PanelModel = types
  .model({
    id: types.string,
    title: types.string,
    description: types.string,
    layout: PanelLayoutModel,
    queryID: types.reference(types.late(() => QueryModel)),
    viz: PanelVizModel,
    style: PanelStyleModel,
  })
  .views((self) => ({
    get json() {
      const { id, title, description, queryID } = self;
      return {
        id,
        title,
        description,
        layout: self.layout.json,
        queryID: queryID.id,
        viz: self.viz.json,
        style: self.style.json,
      };
    },
  }))
  .actions((self) => ({
    setID(id: string) {
      self.id = id;
    },
    setTitle(title: string) {
      self.title = title;
    },
    setDescription(description: string) {
      self.description = description;
    },
    setQueryID(queryID: string) {
      const queryInstance = resolveIdentifier(QueryModel, getRoot(self), queryID);
      if (queryInstance) {
        self.queryID = queryInstance;
      } else {
        throw new Error(`Query with id ${queryID} does not exist`);
      }
    },
  }))
  .actions((self) => ({}));

export type PanelModelInstance = Instance<typeof PanelModel>;
