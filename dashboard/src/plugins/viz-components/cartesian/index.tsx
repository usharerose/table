import { VizComponent } from '../../../types/plugin';
import { VersionBasedMigrator } from '../../plugin-data-migrator';
import { VizCartesianChart } from './viz-cartesian-chart';
import { VizCartesianPanel } from './viz-cartesian-panel';
import { DEFAULT_CONFIG, ICartesianChartConf } from './type';

class VizCartesianMigrator extends VersionBasedMigrator {
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

export const CartesianVizComponent: VizComponent = {
  displayName: 'Cartesian',
  migrator: new VizCartesianMigrator(),
  name: 'cartesian',
  viewRender: VizCartesianChart,
  configRender: VizCartesianPanel,
  createConfig: (): ICartesianChartConf => DEFAULT_CONFIG,
};
