import { CallbackDataParams } from 'echarts/types/dist/shared';
import _ from 'lodash';
import numbro from 'numbro';
import { AnyObject } from '~/types';
import { IHeatmapConf } from '../type';
import { LabelFormattersType } from './formatters';

const formatAdditionalMetric = (v: number) => {
  try {
    return numbro(v).format({
      trimMantissa: true,
      mantissa: 2,
    });
  } catch (error) {
    return v;
  }
};

function getRows(
  conf: IHeatmapConf,
  labelFormatters: LabelFormattersType,
  dataDict: _.Dictionary<AnyObject>,
  params: CallbackDataParams,
) {
  const { value, dataIndex } = params;
  const [x, y, v] = value as [string, string, string];

  const xRow = {
    label: conf.x_axis.name ? conf.x_axis.name : 'X Axis',
    value: labelFormatters.x_axis(x, dataIndex),
    // style: getXAxisLabelStyleInTooltip(conf.scatter.label_overflow.tooltip)
  };

  const yRow = {
    label: conf.y_axis.name ? conf.y_axis.name : 'Y Axis',
    value: labelFormatters.y_axis(y, dataIndex),
    // style: getXAxisLabelStyleInTooltip(conf.scatter.label_overflow.tooltip)
  };

  const valueRow = {
    label: 'Value', // TODO: heat block metric name
    value: v,
  };
  const ret = [xRow, yRow, valueRow];

  const rowData = dataDict[`${x}---${y}`];
  if (rowData) {
    conf.tooltip.metrics.forEach((m) => {
      ret.push({
        label: m.name,
        value: formatAdditionalMetric(_.get(rowData, m.data_key, '')),
      });
    });
  }

  return ret;
}

export function getTooltip(conf: IHeatmapConf, data: AnyObject[], labelFormatters: LabelFormattersType) {
  const dataDict = _.keyBy(data, (d) => `${d[conf.x_axis.data_key]}---${d[conf.y_axis.data_key]}`);
  return {
    confine: true,
    formatter: function (params: CallbackDataParams) {
      const rows = getRows(conf, labelFormatters, dataDict, params);
      const trs = rows.map((r) => {
        return `
          <tr>
            <th style="text-align: right;">${r.label}</th>
            <td style="text-align: right; padding: 0 1em;">${r.value}</td>
          </tr>
        `;
      });

      const template = `
        <table style="width: auto">
          <thead>
            <tr colspan="2">
              <div style="
                width: 100%; height: 4px; border-radius: 2px; margin-bottom: 6px;
                background-color: ${params.color};"
              />
            </tr>
          </thead>
          <tbody>${trs.join('')}</tbody>
        </table>
      `;

      return template;
    },
  };
}
