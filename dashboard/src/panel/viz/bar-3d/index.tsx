import 'echarts-gl';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { GridComponent, LegendComponent, TooltipComponent, VisualMapComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import _ from 'lodash';
import React from 'react';

echarts.use([GridComponent, VisualMapComponent, LegendComponent, TooltipComponent, CanvasRenderer]);

interface IVizBar3D {
  conf: any;
  data: any[];
  width: number;
  height: number;
}

export function VizBar3D({ conf, data, width, height }: IVizBar3D) {
  const { x_axis_data_key, y_axis_data_key, z_axis_data_key, ...restConf } = conf;
  const min = React.useMemo(() => {
    return _.minBy(data, (d) => d[z_axis_data_key])[z_axis_data_key];
  }, [data, z_axis_data_key]);

  const max = React.useMemo(() => {
    return _.maxBy(data, (d) => d[z_axis_data_key])[z_axis_data_key];
  }, [data, z_axis_data_key]);

  const option = {
    tooltip: {},
    backgroundColor: '#fff',
    visualMap: {
      show: true,
      dimension: 2,
      min,
      max,
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026',
        ],
      },
    },
    xAxis3D: {
      type: 'value',
    },
    yAxis3D: {
      type: 'value',
    },
    zAxis3D: {
      type: 'value',
    },
    grid3D: {
      viewControl: {
        projection: 'orthographic',
        autoRotate: false,
      },
      light: {
        main: {
          shadow: true,
          quality: 'ultra',
          intensity: 1.5,
        },
      },
    },
    ...restConf,
    series: [
      {
        type: 'bar3D',
        wireframe: {
          // show: false
        },
        data: data.map((d) => [d[x_axis_data_key], d[y_axis_data_key], d[z_axis_data_key]]),
      },
    ],
  };

  return <ReactEChartsCore echarts={echarts} option={option} style={{ width, height }} />;
}
