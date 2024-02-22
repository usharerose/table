import _ from 'lodash';
import { reaction } from 'mobx';
import { Instance, addDisposer, cast, types } from 'mobx-state-tree';
import { Layout } from 'react-grid-layout';
import { v4 as uuidV4 } from 'uuid';
import { LayoutSetInfo, LayoutSetMetaSnapshotIn, LayoutsRenderModel } from '~/model';

export const LayoutsModel = types
  .compose(
    'LayoutsModel',
    LayoutsRenderModel,
    types.model({
      currentLayoutWrapperWidth: types.optional(types.number, 0),
      currentLayoutPreviewScale: types.optional(types.number, 1),
    }),
  )
  .actions((self) => ({
    setCurrentLayoutWrapperWidth(v: number) {
      self.currentLayoutWrapperWidth = v;
    },
    addALayoutSet(id: string, name: string, breakpoint: number) {
      const target = self.basisLayoutSet;
      const newSet = {
        id,
        name,
        breakpoint,
        list: target.json.list.map((l) => ({
          ...l,
          id: uuidV4(),
        })),
      };
      self.list.push(newSet);
    },
    updateLayoutSetsInfo(infos: LayoutSetInfo[]) {
      const idmap = _.keyBy(self.list, 'id');
      infos.forEach((info) => {
        const layoutset = idmap[info.id];
        if (layoutset) {
          layoutset.setName(info.name);
          layoutset.setBreakpoint(info.breakpoint);
          delete idmap[info.id];
          return;
        }

        this.addALayoutSet(info.id, info.name, info.breakpoint);
      });

      const idsToRemove = new Set(Object.keys(idmap));
      const willRemove = idsToRemove.size > 0;
      idsToRemove.forEach((id) => {
        const i = self.list.findIndex((s) => s.id === id);
        self.list.splice(i, 1);
      });
      if (willRemove) {
        self.setCurrentBreakpoint('basis');
      }
    },
    updateCurrentLayoutItems(allLayouts: Record<string, Layout[]>) {
      const items = allLayouts[self.currentBreakpoint];
      self.currentLayoutSet.updateLayouts(items);
    },
    append(item: LayoutSetMetaSnapshotIn) {
      self.list.push(item);
    },
    appendMultiple(items: LayoutSetMetaSnapshotIn[]) {
      if (items.length === 0) {
        return;
      }

      self.list.push(...items);
    },
    remove(index: number) {
      self.list.splice(index, 1);
    },
    removeByID(id: string) {
      const index = self.list.findIndex((o) => o.id === id);
      if (index === -1) {
        return;
      }
      self.list.splice(index, 1);
    },
    removeByIDs(ids: string[]) {
      ids.forEach((id) => {
        this.removeByID(id);
      });
    },
    afterCreate() {
      addDisposer(
        self,
        reaction(
          () => {
            return `${self.currentLayoutPreviewWidth}|${self.currentLayoutWrapperWidth}`;
          },
          () => {
            const w1 = self.currentLayoutPreviewWidth;
            const w2 = self.currentLayoutWrapperWidth;
            if (!w1 || !w2) {
              self.currentLayoutPreviewScale = 1;
              return;
            }
            if (w1 <= w2) {
              self.currentLayoutPreviewScale = 1;
              return;
            }

            self.currentLayoutPreviewScale = w2 / w1;
            return;
          },
          {
            fireImmediately: false,
          },
        ),
      );
    },
  }));

export type LayoutsModelInstance = Instance<typeof LayoutsModel>;
