import { CustomSeriesRenderItemAPI, CustomSeriesRenderItemParams } from 'echarts';
import { ScatterSeries } from './type';
import { getLayout } from './utils';

function render(api: CustomSeriesRenderItemAPI) {
  const layout = getLayout(api);
  const w = layout[0].width;

  const categoryIndex = api.value(0) as number;
  const value = api.value(1);
  const [x, y] = api.coord([categoryIndex, value]);
  const start = x + layout[0].offset;
  const cx = start + Math.random() * w;
  const cy = y;
  return {
    type: 'circle',
    transition: ['shape'],
    shape: {
      cx,
      cy,
      r: 2,
    },
    style: {
      fill: api.visual('color'),
      opacity: 0.5,
    },
  };
}

export function getCustomScatter() {
  const series: ScatterSeries = {
    name: 'Custom Scatter',
    type: 'custom',
    itemStyle: {
      color: '#ED6A45',
    },
    emphasis: {
      scale: 2,
    },
    datasetIndex: 2,
  };

  series.renderItem = (params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) => render(api);
  return series;
}
