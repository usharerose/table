import { ActionIcon, Group, Stack, Text, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import _ from 'lodash';
import React from 'react';
import { DeviceFloppy } from 'tabler-icons-react';
import { IVizPanelProps } from '../../../../types/viz-panel';
import { IVizStatsConf } from '../types';
import { ILegacyStatsConf, updateSchema } from '../update';
import { VariablesField } from './variables';
import { TemplateInput } from '../../../../utils/template/editor';

function getInitialConf(): IVizStatsConf {
  return {
    align: 'center',
    template: 'The variable ${value} is defined in Variables section',
    variables: [
      {
        name: 'value',
        size: '20px',
        weight: 'bold',
        color: {
          type: 'static',
          staticColor: 'blue',
        },
        data_field: '',
        aggregation: 'none',
        formatter: {
          output: 'number',
          mantissa: 0,
        },
      },
    ],
  };
}

interface IVizStatsPanel extends Omit<IVizPanelProps, 'conf' | 'setConf'> {
  conf: IVizStatsConf | ILegacyStatsConf;
  setConf: (conf: IVizStatsConf) => void;
}

export function VizStatsPanel({ conf, setConf, data }: IVizStatsPanel) {
  const defaultValues = React.useMemo(() => {
    const { align, template = '', variables = [] } = updateSchema(conf);
    if (!align) {
      return getInitialConf();
    }
    return {
      variables,
      template,
      align,
    };
  }, [conf]);

  React.useEffect(() => {
    const configMalformed = !_.isEqual(conf, defaultValues);
    if (configMalformed) {
      setConf(defaultValues);
    }
  }, [conf, defaultValues]);

  const { control, handleSubmit, watch, getValues } = useForm<IVizStatsConf>({ defaultValues });

  watch(['variables', 'template']);
  const values = getValues();
  const changed = React.useMemo(() => {
    return !_.isEqual(values, conf);
  }, [values, conf]);

  return (
    <Stack mt="md" spacing="xs">
      <form onSubmit={handleSubmit(setConf)}>
        <Group position="left" py="md" pl="md" sx={{ borderBottom: '1px solid #eee', background: '#efefef' }}>
          <Text weight={500}>Stats Configurations</Text>
          <ActionIcon type="submit" mr={5} variant="filled" color="blue" disabled={!changed}>
            <DeviceFloppy size={20} />
          </ActionIcon>
        </Group>
        <Controller
          name="template"
          control={control}
          render={({ field }) => <TemplateInput label="Template" py="md" sx={{ flexGrow: 1 }} {...field} />}
        />
        <Text pb="sm" pt="md" size="sm">
          Variables
        </Text>
        <VariablesField control={control} watch={watch} data={data} />
      </form>
    </Stack>
  );
}
