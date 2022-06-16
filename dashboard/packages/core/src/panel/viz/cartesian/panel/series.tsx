import { ActionIcon, Button, Group, SegmentedControl, Select, Text, TextInput } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import React from "react";
import { Control, Controller, useFieldArray, UseFieldArrayRemove, UseFormGetValues, UseFormWatch } from "react-hook-form";
import { Trash } from "tabler-icons-react";
import { MantineColorSelector } from "../../../settings/common/mantine-color";
import { ICartesianChartConf, ICartesianChartSeriesItem } from "../type";

const labelPositions = [
  { label: 'off', value: '', },
  { label: 'top', value: 'top', },
  { label: 'left', value: 'left', },
  { label: 'right', value: 'right', },
  { label: 'bottom', value: 'bottom', },
  { label: 'inside', value: 'inside', },
  { label: 'insideLeft', value: 'insideLeft', },
  { label: 'insideRight', value: 'insideRight', },
  { label: 'insideTop', value: 'insideTop', },
  { label: 'insideBottom', value: 'insideBottom', },
  { label: 'insideTopLeft', value: 'insideTopLeft', },
  { label: 'insideBottomLeft', value: 'insideBottomLeft', },
  { label: 'insideTopRight', value: 'insideTopRight', },
  { label: 'insideBottomRight', value: 'insideBottomRight', },
]


interface ISeriesItemField {
  control: Control<ICartesianChartConf, any>;
  index: number;
  remove: UseFieldArrayRemove;
  seriesItem: ICartesianChartSeriesItem;
  yAxisOptions: {
    label: string;
    value: string;
  }[];
}

function SeriesItemField({ control, index, remove, seriesItem, yAxisOptions }: ISeriesItemField) {
  const type = seriesItem.type;
  return (
    <Group key={index} direction="column" grow my={0} p="md" pr={40} sx={{ border: '1px solid #eee', position: 'relative' }}>
      <Group direction="column" grow noWrap>
        <Controller
          name={`series.${index}.type`}
          control={control}
          render={(({ field }) => (
            <SegmentedControl
              data={[
                { label: 'Line', value: 'line' },
                { label: 'Bar', value: 'bar' },
                { label: 'Scatter', value: 'scatter', disabled: true },
                { label: 'Boxplot', value: 'boxplot', disabled: true },
              ]}
              {...field}
            />
          ))}
        />
      </Group>
      <Controller
        name={`series.${index}.name`}
        control={control}
        render={(({ field }) => (
          <TextInput
            label="Name"
            required
            sx={{ flex: 1 }}
            {...field}
          />
        ))}
      />
      <Group direction="row" grow noWrap>
        <Controller
          name={`series.${index}.y_axis_data_key`}
          control={control}
          render={(({ field }) => (
            <TextInput
              label="Value key"
              required
              sx={{ flex: 1 }}
              {...field}
            />
          ))}
        />
        <Controller
          name={`series.${index}.yAxisIndex`}
          control={control}
          render={(({ field: { value, onChange, ...rest } }) => (
            <Select
              label="Y Axis"
              data={yAxisOptions}
              disabled={yAxisOptions.length === 0}
              {...rest}
              value={value?.toString() ?? ''}
              onChange={(value: string | null) => {
                if (!value) {
                  onChange(0);
                  return;
                }
                onChange(Number(value))
              }}
              sx={{ flex: 1 }}
            />

          ))}
        />
      </Group>
      {type === 'bar' && (
        <Group direction="row" grow align="top">
          <Controller
            name={`series.${index}.stack`}
            control={control}
            render={(({ field }) => (
              <TextInput
                label="Stack"
                placeholder="Stack bars by this ID"
                sx={{ flexGrow: 1 }}
                {...field}
              />
            ))}
          />
          <Controller
            name={`series.${index}.barWidth`}
            control={control}
            render={(({ field }) => (
              <TextInput
                label="Bar Width"
                sx={{ flexGrow: 1 }}
                {...field}
              />
            ))}
          />
        </Group>
      )}
      <Controller
        name={`series.${index}.label_position`}
        control={control}
        render={(({ field }) => (
          <Select
            label="Label Position"
            data={labelPositions}
            {...field}
          />
        ))}
      />
      <Group direction="column" grow spacing={4}>
        <Text size="sm">Color</Text>
        <Controller
          name={`series.${index}.color`}
          control={control}
          render={(({ field }) => (
            <MantineColorSelector {...field} />
          ))}
        />
      </Group>
      <ActionIcon
        color="red"
        variant="hover"
        onClick={() => remove(index)}
        sx={{ position: 'absolute', top: 15, right: 5 }}
      >
        <Trash size={16} />
      </ActionIcon>
    </Group>
  )
}

interface ISeriesField {
  control: Control<ICartesianChartConf, any>;
  watch: UseFormWatch<ICartesianChartConf>;
  getValues: UseFormGetValues<ICartesianChartConf>;
}
export function SeriesField({ control, watch, getValues }: ISeriesField) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "series"
  });

  const watchFieldArray = watch("y_axes");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index]
    };
  });

  const addSeries = () => append({
    type: 'bar',
    name: randomId(),
    showSymbol: false,
    y_axis_data_key: 'value',
    yAxisIndex: 0,
    label_position: 'top',
    stack: '',
    color: '#000'
  });

  const yAxisOptions = React.useMemo(() => {
    return getValues().y_axes.map(({ name }, index) => ({
      label: name,
      value: index.toString()
    }))
  }, [getValues]);

  return (
    <Group direction="column" grow>
      <Text mt="xl" mb={0}>Series</Text>
      {controlledFields.map((seriesItem, index) => (
        <SeriesItemField
          control={control}
          index={index}
          remove={remove}
          seriesItem={seriesItem}
          yAxisOptions={yAxisOptions}
        />
      ))}
      <Group position="center" mt="xs">
        <Button onClick={addSeries}>
          Add a Series
        </Button>
      </Group>
    </Group>
  )
}
