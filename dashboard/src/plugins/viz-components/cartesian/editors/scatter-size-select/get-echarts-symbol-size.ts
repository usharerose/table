import lodash, { keyBy } from 'lodash';
import { interpolate } from 'popmotion';
import { AnyObject } from '~/types';
import { TScatterSize, TScatterSize_Dynamic, TScatterSize_Static } from './types';
import { extractFullQueryData, parseDataKey } from '~/utils/data';

export function getEchartsSymbolSize(
  { type, ...rest }: TScatterSize,
  data: TPanelData,
  x_axis_data_key: string,
  variableValueMap: Record<string, string | number>,
) {
  if (!type) {
    return 10;
  }
  if (type === 'static') {
    const { size } = rest as TScatterSize_Static;
    return size;
  }
  const { func_content } = rest as TScatterSize_Dynamic;
  const { queryID, columnKey } = parseDataKey(x_axis_data_key);
  const rows = keyBy(extractFullQueryData(data, queryID), columnKey);
  return (_value: number, params: $TSFixMe) => {
    let rowData;
    if (params.name) {
      // xAxis's type is category
      rowData = rows[params.name];
    } else {
      // xAxis's type is value
      rowData = data[params.dataIndex];
    }
    try {
      return new Function(`return ${func_content}`)()(
        { rowData, params, variables: variableValueMap },
        { lodash, interpolate },
      );
    } catch (error) {
      // @ts-expect-error Object is of type 'unknown'.
      console.error(`[getEchartsSymbolSize] failed parsing custom function, error: ${error.message}`);
      return 10;
    }
  };
}
