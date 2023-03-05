import { Divider, Group, NumberInput, Select, Stack, Text, TextInput } from '@mantine/core';
import { Control, Controller, UseFormWatch } from 'react-hook-form';
import { DataFieldSelector } from '~/panel/settings/common/data-field-selector';
import { AnyObject } from '~/types';
import { IHeatmapConf } from '../../type';
import { XAxisLabelFormatterField } from '../x-axis/x-axis-label-formatter';

const nameAlignmentOptions = [
  { label: 'left', value: 'left' },
  { label: 'center', value: 'center' },
  { label: 'right', value: 'right' },
];
interface IYAxisField {
  watch: UseFormWatch<IHeatmapConf>;
  control: Control<IHeatmapConf, $TSFixMe>;
  data: AnyObject[];
}

export function YAxisField({ control, watch, data }: IYAxisField) {
  watch(['y_axis']);
  return (
    <Stack my={0} p="0" sx={{ position: 'relative' }}>
      <Controller
        name="y_axis.data_key"
        control={control}
        render={({ field }) => (
          <DataFieldSelector label="Data Field" required data={data} sx={{ flex: 1 }} {...field} />
        )}
      />
      <Divider mb={-15} variant="dashed" label="Name" labelPosition="center" />
      <Group grow noWrap>
        <Controller
          name="y_axis.name"
          control={control}
          render={({ field }) => <TextInput label="Name" required sx={{ flex: 1 }} {...field} />}
        />
        <Controller
          name="y_axis.nameAlignment"
          control={control}
          render={({ field }) => (
            <Select label="Align" required data={nameAlignmentOptions} sx={{ flex: 1 }} {...field} />
          )}
        />
      </Group>
      <Divider mb={-15} variant="dashed" label="Layout" labelPosition="center" />
      <Divider mb={-15} label="Tick Label" labelPosition="center" />
      <Group grow noWrap>
        <Controller
          name="y_axis.axisLabel.rotate"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Rotate"
              hideControls
              min={-90}
              max={90}
              rightSection={<Text color="dimmed">degree</Text>}
              sx={{ width: '48%' }}
              styles={{
                rightSection: {
                  width: '4em',
                  justifyContent: 'flex-end',
                  paddingRight: '6px',
                },
              }}
              {...field}
            />
          )}
        />
        <Controller
          name="y_axis.axisLabel.formatter"
          control={control}
          render={({ field }) => <XAxisLabelFormatterField data={data} {...field} />}
        />
      </Group>
    </Stack>
  );
}
