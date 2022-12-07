import { ActionIcon, Box, Button, Divider, Group, Modal, NumberInput, SimpleGrid, Stack } from '@mantine/core';
import { useBoolean } from 'ahooks';
import { toJS } from 'mobx';
import { ReactNode, useState } from 'react';
import { Plus } from 'tabler-icons-react';
import { TestSizeInterpolation } from './test-interpolation';
import { TScatterSize, TScatterSize_Interpolation } from './types';

const InputGroup = ({ children }: { children: ReactNode }) => {
  return (
    <Group
      noWrap
      spacing={0}
      sx={{
        '> .mantine-NumberInput-root:first-child input': {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderRightWidth: 0.5,
        },
        '> .mantine-NumberInput-root:last-child input': {
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
}

const Field = ({ value, onChange }: IField) => {
  const [modalOpened, { setTrue, setFalse }] = useBoolean();
  const [localValue, setLocalValue] = useState<TScatterSize_Interpolation>(value);

  const handleOk = () => {
    setFalse();
    onChange(toJS(localValue));
  };

  const handleCancel = () => {
    setFalse();
    setLocalValue(value);
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
      <Modal size={800} title="Setup size interpolation" opened={modalOpened} onClose={setFalse}>
        {modalOpened && (
          <Stack>
            <SimpleGrid cols={4}>
              {localValue.points.map((p, i) => (
                <InputGroup key={i}>
                  <NumberInput description="Size" value={p.size} onBlur={getChangeHandler(i, 'size')} hideControls />
                  <NumberInput description="Value" value={p.value} onBlur={getChangeHandler(i, 'value')} hideControls />
                </InputGroup>
              ))}
              <ActionIcon
                variant="filled"
                color="blue"
                onClick={addPoint}
                sx={{ alignSelf: 'center', transform: 'translateY(9px)' }}
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
}

export const InterpolationScatterSizeField = ({ value, onChange }: IInterpolationScatterSizeField) => {
  if (value.type !== 'interpolation') {
    return null;
  }

  return <Field value={value} onChange={onChange} />;
};
