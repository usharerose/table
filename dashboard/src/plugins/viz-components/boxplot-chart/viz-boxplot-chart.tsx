import ReactEChartsCore from 'echarts-for-react/lib/core';
import 'echarts-gl';
import { BoxplotChart } from 'echarts/charts';
import {
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import _, { defaults } from 'lodash';
import { useMemo } from 'react';
import { useCurrentInteractionManager, useTriggerSnapshotList } from '~/interactions';
import { useStorageData } from '~/plugins/hooks';
import { VizViewProps } from '~/types/plugin';
import { getOption } from './option';
import { ClickBoxplotSeries } from './triggers';
import { DEFAULT_CONFIG, IBoxplotChartConf, IBoxplotDataItem } from './type';

echarts.use([
  DataZoomComponent,
  BoxplotChart,
  MarkLineComponent,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  CanvasRenderer,
]);

interface IClickBoxplotSeries {
  type: 'click';
  seriesType: 'boxplot';
  componentSubType: 'boxplot';
  componentType: 'series';
  name: string;
  color: string;
  value: IBoxplotDataItem;
}

export function VizBoxplotChart({ context, instance }: VizViewProps) {
  const { value: conf } = useStorageData<IBoxplotChartConf>(context.instanceData, 'config');
  const { variables } = context;
  const data = context.data as $TSFixMe[];
  const { width, height } = context.viewport;
  const config = defaults({}, conf, DEFAULT_CONFIG);

  // interactions
  const interactionManager = useCurrentInteractionManager({
    vizManager: context.vizManager,
    instance,
  });
  const triggers = useTriggerSnapshotList<IBoxplotChartConf>(interactionManager.triggerManager, ClickBoxplotSeries.id);

  const rowDataMap = useMemo(() => {
    return _.keyBy(data, config.x_axis.data_key);
  }, [data, config.x_axis.data_key]);

  const handleSeriesClick = (params: IClickBoxplotSeries) => {
    const rowData = _.get(rowDataMap, params.name, { error: 'rowData is not found' });
    triggers.forEach((t) => {
      interactionManager.runInteraction(t.id, { ...params, rowData });
    });
  };

  const option = useMemo(() => getOption({ config, data, variables }), [config, data, variables]);

  if (!conf || !width || !height) {
    return null;
  }
  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      style={{ width, height }}
      onEvents={{ click: handleSeriesClick }}
    />
  );
}
