import { Instance, types } from 'mobx-state-tree';
import { EViewComponentType } from '~/types';
import { PanelsModel } from './panels';

export const ViewModel = types
  .model({
    id: types.string,
    type: types.string,
    config: types.frozen(),
    panels: PanelsModel,
  })
  .views((self) => ({
    get json() {
      const { id, type, config } = self;
      return {
        id,
        type,
        config,
        panels: self.panels.json,
      };
    },
  }))
  .actions((self) => ({
    setID(id: string) {
      self.id = id;
    },
    setType(type: EViewComponentType) {
      if (self.type === type) {
        return;
      }
      if (type === EViewComponentType.Modal) {
        self.config = {
          width: '600px',
          height: '400px',
        };
      } else {
        self.config = {};
      }
      self.type = type;
    },
    setConfig(config: Record<string, any>) {
      self.config = config;
    },
    updateConfig(key: string, value: $TSFixMe) {
      self.config[key] = value;
    },
  }))
  .actions((self) => ({}));

export type ViewModelInstance = Instance<typeof ViewModel>;
