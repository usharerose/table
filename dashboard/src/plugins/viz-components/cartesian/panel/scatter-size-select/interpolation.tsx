import {
  ActionIcon,
  Alert,
  Box,
  Button,
  Code,
  Divider,
  Group,
  List,
  Modal,
  NumberInput,
  SimpleGrid,
  Stack,
} from '@mantine/core';
import { useBoolean } from 'ahooks';
import { uniqBy } from 'lodash';
import { ReactNode, useState } from 'react';
import { Bulb, Plus } from 'tabler-icons-react';
import { DataFieldSelector } from '~/panel/settings/common/data-field-selector';
import { AnyObject } from '~/types';
import { TestSizeInterpolation } from './test-interpolation';
import { TScatterSize, TScatterSize_Interpolation } from './types';

const InputGroup = ({ children }: { children: ReactNode }) => {
  return (
    <Group
      noWrap
      spacing={0}
      sx={{
        '> .mantine-NumberInput-root:first-of-type input': {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderRightWidth: 0.5,
        },
        '> .mantine-NumberInput-root:last-of-type input': {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderLeftWidth: 0.5,
        },
      }}
    >
      {children}
    </Group>
  );
};

interface IField {
  value: TScatterSize_Interpolation;
  onChange: (v: TScatterSize_Interpolation) => void;
  data: AnyObject[];
}

const Field = ({ value, onChange, data }: IField) => {
  const [modalOpened, { setTrue, setFalse }] = useBoolean();
  const [localValue, setLocalValue] = useState<TScatterSize_Interpolation>(value);

  const handleOk = () => {
    setFalse();
    const { type, data_key, points } = localValue;
    const newPoints = uniqBy(points, (v) => v.value).sort((a, b) => a.value - b.value);
    const newValue = {
      type,
      data_key,
      points: newPoints,
    };

    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleCancel = () => {
    setFalse();
    setLocalValue(value);
  };

  const changeDataKey = (data_key: string) => {
    setLocalValue((prev) => ({
      ...prev,
      data_key,
    }));
  };

  const addPoint = () => {
    const points = [
      ...localValue.points,
      {
        size: 1,
        value: 1,
      },
    ];
    setLocalValue({
      ...localValue,
      points,
    });
  };

  const getChangeHandler =
    (index: number, key: 'size' | 'value'): React.FocusEventHandler<HTMLInputElement> =>
    (e) => {
      const newPoints = [...localValue.points];
      const v = Number(e.currentTarget.value);
      if (Number.isNaN(v)) {
        return;
      }

      newPoints[index][key] = v;
      setLocalValue({
        ...localValue,
        points: newPoints,
      });
    };

  return (
    <>
      <Box sx={{ width: '50%' }}>
        <Button variant="filled" mt={24} onClick={setTrue} sx={{ flexGrow: 0 }}>
          Setup
        </Button>
      </Box>
      <Modal
        size={800}
        title="Setup size interpolation"
        opened={modalOpened}
        onClose={setFalse}
        closeOnClickOutside={false}
        withCloseButton={false}
      >
        {modalOpened && (
          <Stack>
            <Alert icon={<Bulb size={16} />} title="How does it work?">
              <List type="ordered">
                <List.Item>
                  <Group spacing={6}>
                    get value by <Code sx={{ alignSelf: 'end' }}>Data Key</Code>
                  </Group>
                </List.Item>
                <List.Item>
                  <Group spacing={6}>
                    map value by <Code sx={{ alignSelf: 'end' }}>Anchor Points</Code> (from values to sizes)
                  </Group>
                </List.Item>
              </List>
            </Alert>
            <Divider mt={10} mb={-10} label="Data" labelPosition="center" variant="dashed" />
            <Stack spacing={10}>
              <Group noWrap align="end">
                <DataFieldSelector
                  data={data}
                  label="Data Key"
                  value={localValue.data_key}
                  onChange={changeDataKey}
                  sx={{ width: '300px' }}
                />
                <Button size="sm">See current values</Button>
              </Group>
            </Stack>
            <Divider mt={10} mb={0} label="Anchor Points" labelPosition="center" variant="dashed" />
            <SimpleGrid cols={4}>
              {localValue.points.map((p, i) => (
                <InputGroup key={i}>
                  <NumberInput
                    label="Value"
                    value={p.value}
                    onBlur={getChangeHandler(i, 'value')}
                    hideControls
                    styles={{
                      label: {
                        fontSize: '12px',
                        color: 'rgb(255, 107, 107)',
                      },
                    }}
                  />
                  <NumberInput
                    label="Size"
                    value={p.size}
                    onBlur={getChangeHandler(i, 'size')}
                    hideControls
                    styles={{
                      label: {
                        fontSize: '12px',
                        color: 'rgb(51, 154, 240)',
                      },
                    }}
                  />
                </InputGroup>
              ))}
              <ActionIcon
                variant="filled"
                color="blue"
                onClick={addPoint}
                sx={{ alignSelf: 'center', transform: 'translateY(12px) !important' }}
              >
                <Plus size={20} />
              </ActionIcon>
            </SimpleGrid>
            <Divider mt={20} mb={0} label="Quick test" labelPosition="center" variant="dashed" />
            <TestSizeInterpolation points={localValue.points} />
            <Group position="right">
              <Button onClick={handleCancel} variant="subtle">
                Cancel
              </Button>
              <Button onClick={handleOk}>OK</Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </>
  );
};

interface IInterpolationScatterSizeField {
  value: TScatterSize;
  onChange: (v: TScatterSize) => void;
  data: AnyObject[];
}

export const InterpolationScatterSizeField = ({ value, onChange, data }: IInterpolationScatterSizeField) => {
  if (value.type !== 'interpolation') {
    return null;
  }

  return <Field value={value} onChange={onChange} data={data} />;
};
