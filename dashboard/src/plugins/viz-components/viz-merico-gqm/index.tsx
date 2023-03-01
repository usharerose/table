import { VizComponent } from '../../../types/plugin';
import { VersionBasedMigrator } from '../../plugin-data-migrator';
import { VizMericoGQM } from './viz-merico-gqm';
import { VizMericoGQMPanel } from './viz-merico-gqm-panel';
import { DEFAULT_CONFIG, IMericoGQMConf } from './type';
import { cloneDeep } from 'lodash';

class VizMericoGQMMigrator extends VersionBasedMigrator {
  readonly VERSION = 1;

  configVersions(): void {
    this.version(1, (data: any) => {
      return {
        version: 1,
        config: data,
      };
    });
  }
}

export const MericoGQMVizComponent: VizComponent = {
  displayName: 'Merico GQM',
  displayGroup: 'Merico suite',
  migrator: new VizMericoGQMMigrator(),
  name: 'mericoGQM',
  viewRender: VizMericoGQM,
  configRender: VizMericoGQMPanel,
  createConfig() {
    return {
      version: 1,
      config: cloneDeep(DEFAULT_CONFIG) as IMericoGQMConf,
    };
  },
};
