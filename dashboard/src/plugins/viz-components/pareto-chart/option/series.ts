import { AnyObject } from '~/types';
import { IParetoChartConf } from '../type';
import { getMarkLine } from './mark-line';
import { TLineDataItem } from './types';
import { formatPercentage } from './utils';

function formatterForLine(payload: $TSFixMe) {
  const value = payload.value[1];
  try {
    return formatPercentage(value);
  } catch (error) {
    console.error(error);
    return value;
  }
}

export function getSeries(conf: IParetoChartConf, data: AnyObject[]) {
  const barData = data.map((d) => [d[conf.x_axis.data_key], Number(d[conf.data_key])]).sort((a, b) => b[1] - a[1]);
  const sum = barData.reduce((sum, curr) => sum + curr[1], 0);
  const lineData = barData
    .reduce((ret, curr, index) => {
      const prevValue = index === 0 ? 0 : ret[index - 1][1];
      ret.push([curr[0], prevValue + curr[1]]);
      return ret;
    }, [] as TLineDataItem[])
    .map((row) => [row[0], row[1] / sum] as TLineDataItem);

  const markLine = getMarkLine(conf, lineData);
  return [
    {
      name: conf.bar.name,
      type: 'bar',
      itemStyle: {
        color: conf.bar.color,
      },
      yAxisIndex: 0,
      data: barData,
    },
    {
      name: conf.line.name,
      type: 'line',
      itemStyle: {
        color: conf.line.color,
      },
      symbolSize: 2,
      lineStyle: {
        width: 1,
      },
      label: {
        show: false,
        position: 'top',
        formatter: formatterForLine,
      },
      yAxisIndex: 1,
      data: lineData,
      markLine,
    },
  ];
}
