import { Text } from '@mantine/core';
import { ITriggerConfigProps, ITriggerSchema } from '~/types/plugin';

export function ClickCalendarDateSettings(props: ITriggerConfigProps) {
  return <></>;
}

function ClickCalendarDateName(props: Omit<ITriggerConfigProps, 'sampleData'>) {
  return <Text>Click heat block</Text>;
}

export const ClickCalendarDate: ITriggerSchema = {
  id: 'builtin:echarts:click-heatmap:heat-block',
  displayName: 'Click Heat Block',
  nameRender: ClickCalendarDateName,
  configRender: ClickCalendarDateSettings,
  payload: [
    {
      name: 'seriesType',
      description: `'heatmap'`,
      valueType: 'string',
    },
    {
      name: 'componentType',
      description: `'series'`,
      valueType: 'string',
    },
    {
      name: 'name',
      description: `Name of the series clicked`,
      valueType: 'string',
    },
    {
      name: 'color',
      description: `Color`,
      valueType: 'string',
    },
    {
      name: 'value',
      description: `String-typed number, or series' actual value`,
      valueType: 'string',
    },
    {
      name: 'rowData',
      description: `Data of the row`,
      valueType: 'object',
    },
  ],
};

export interface IClickCalendarDateConfig {
  foo: '';
}
