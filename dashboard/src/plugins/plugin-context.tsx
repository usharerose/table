import { createContext } from 'react';
import * as PACKAGE from '../../package.json';

import { IDashboardPlugin, IPluginManager } from '../types/plugin';
import { PluginManager } from './plugin-manager';
import { StatsVizComponent } from './viz-components/stats';
import { TableVizComponent } from './viz-components/table';
import { VizManager } from './viz-manager';

interface IPluginContextProps {
  pluginManager: IPluginManager;
  vizManager: VizManager;
}

const BuiltInPlugin: IDashboardPlugin = {
  id: 'dashboard',
  version: PACKAGE.version,
  manifest: {
    viz: [TableVizComponent, StatsVizComponent],
    color: [],
  },
};

export const pluginManager = new PluginManager();

export const createPluginContext = (): IPluginContextProps => {
  const vizManager = new VizManager(pluginManager);
  return { pluginManager, vizManager };
};

export const PluginContext = createContext<IPluginContextProps>(createPluginContext());

pluginManager.install(BuiltInPlugin);
