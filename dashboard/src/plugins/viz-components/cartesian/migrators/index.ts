import { random } from 'chroma-js';
import _, { cloneDeep, omit } from 'lodash';
import { AnyObject } from '~/types';
import { DefaultAggregation } from '~/utils/aggregation';
import { ITemplateVariable } from '~/utils/template';
import { DEFAULT_DATA_ZOOM_CONFIG } from '../editors/echarts-zooming-field/types';
import { DEFAULT_X_AXIS_LABEL_FORMATTER } from '../editors/x-axis/x-axis-label-formatter/types';
import { ICartesianChartConf } from '../type';

export function updateSchema2(legacyConf: ICartesianChartConf & { variables: ITemplateVariable[] }): AnyObject {
  const cloned = cloneDeep(omit(legacyConf, 'variables'));
  cloned.stats = omit(cloned.stats, 'variables');
  return cloned;
}

export function updateToSchema3(legacyConf: $TSFixMe): ICartesianChartConf {
  const { rotate, formatter = DEFAULT_X_AXIS_LABEL_FORMATTER } = legacyConf.x_axis.axisLabel;
  return {
    ...legacyConf,
    x_axis: {
      ...legacyConf.x_axis,
      axisLabel: {
        rotate,
        formatter,
      },
    },
  };
}

export function updateToSchema4(legacyConf: $TSFixMe): ICartesianChartConf {
  const { dataZoom = DEFAULT_DATA_ZOOM_CONFIG, ...rest } = legacyConf;
  return {
    ...rest,
    dataZoom,
  };
}

export function v5(legacyConf: $TSFixMe): ICartesianChartConf {
  const patch = {
    x_axis: {
      axisLabel: {
        overflow: {
          x_axis: {
            width: 80,
            overflow: 'truncate',
            ellipsis: '...',
          },
          tooltip: {
            width: 200,
            overflow: 'break',
            ellipsis: '...',
          },
        },
      },
    },
  };
  return _.defaultsDeep(patch, legacyConf);
}

export function v6(legacyConf: $TSFixMe): ICartesianChartConf {
  const reference_lines = legacyConf.reference_lines.map((l: AnyObject) => {
    const {
      lineStyle = {
        type: 'dashed',
        width: 1,
        color: random().css(),
      },
      show_in_legend = false,
    } = l;

    return {
      ...l,
      lineStyle,
      show_in_legend,
    };
  });
  return {
    ...legacyConf,
    reference_lines,
  };
}

export function v7(legacyConf: $TSFixMe): ICartesianChartConf {
  const reference_lines = legacyConf.reference_lines.map((l: AnyObject) => {
    const { yAxisIndex = 0 } = l;

    return {
      ...l,
      yAxisIndex,
    };
  });
  return {
    ...legacyConf,
    reference_lines,
  };
}

export function v8(legacyConf: $TSFixMe): ICartesianChartConf {
  const series = legacyConf.series.map((l: AnyObject) => {
    const { aggregation_on_group = DefaultAggregation } = l;

    return {
      ...l,
      aggregation_on_group,
    };
  });
  return {
    ...legacyConf,
    series,
  };
}

export function v9(legacyConf: $TSFixMe): ICartesianChartConf {
  const series = legacyConf.series.map((l: AnyObject) => {
    const { aggregation_on_value = DefaultAggregation } = l;

    return {
      ...l,
      aggregation_on_value,
    };
  });
  return {
    ...legacyConf,
    series,
  };
}

export function v10(legacyConf: $TSFixMe): ICartesianChartConf {
  delete legacyConf.config;
  const { x_axis, tooltip } = legacyConf.x_axis.axisLabel.overflow;
  const patch = {
    x_axis: {
      axisLabel: {
        overflow: {
          on_axis: x_axis,
          in_tooltip: tooltip,
        },
      },
    },
  };
  return _.defaultsDeep(patch, legacyConf);
}

export function v11(legacyConf: any): ICartesianChartConf {
  const { series, ...rest } = legacyConf;
  return {
    ...rest,
    series: series.map((s: any) => {
      const { barMinWidth, barWidth, barMaxWidth } = s;
      if (barMinWidth) {
        return {
          ...s,
          barMinWidth,
          barWidth: '',
          barMaxWidth: barMaxWidth ?? barWidth,
        };
      }
      return {
        ...s,
        barMinWidth: '',
        barWidth,
        barMaxWidth: '',
      };
    }),
  };
}

export function v12(legacyConf: any): ICartesianChartConf {
  const { y_axes, ...rest } = legacyConf;
  return {
    ...rest,
    y_axes: y_axes.map((y: any) => {
      const { min = '', max = '' } = y;
      return {
        ...y,
        min,
        max,
      };
    }),
  };
}

export function v13(legacyConf: any): ICartesianChartConf {
  const { y_axes, ...rest } = legacyConf;
  return {
    ...rest,
    y_axes: y_axes.map((y: any) => {
      const { nameAlignment = 'left' } = y;
      return {
        ...y,
        nameAlignment,
      };
    }),
  };
}

export function v14(legacyConf: any): ICartesianChartConf {
  const { y_axes, ...rest } = legacyConf;
  return {
    ...rest,
    y_axes: y_axes.map((y: any) => {
      const { show = true } = y;
      return {
        ...y,
        show,
      };
    }),
  };
}

export function v15(legacyConf: any): ICartesianChartConf {
  const { regressions, ...rest } = legacyConf;
  return {
    ...rest,
    regressions: regressions.map((r: any) => {
      const { group_by_key = '' } = r;
      return {
        ...r,
        group_by_key,
      };
    }),
  };
}

export function v16(legacyConf: any): ICartesianChartConf {
  const { series, y_axes, ...rest } = legacyConf;
  return {
    ...rest,
    series: series.map((s: any) => {
      const { hide_in_legend = false, aggregation_on_value = DefaultAggregation } = s;
      return {
        ...s,
        hide_in_legend,
        aggregation_on_value,
      };
    }),
    y_axes: y_axes.map((y: any) => {
      const { min = '', max = '', show = true } = y;
      return {
        ...y,
        min,
        max,
        show,
      };
    }),
  };
}
