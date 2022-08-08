import { Button, Group, Stack } from '@mantine/core';
import { ArrowLeft } from 'tabler-icons-react';
import { Panel } from '../panel';
import { IDashboardPanel } from '../types';

export function FullScreenPanel({ panel, exitFullScreen }: { panel: IDashboardPanel; exitFullScreen: () => void }) {
  return (
    <Stack sx={{ flexGrow: 1, justifyContent: 'flex-start' }}>
      <Group sx={{ flexGrow: 0 }}>
        <Button variant="default" size="sm" onClick={exitFullScreen} leftIcon={<ArrowLeft size={20} />}>
          Exit fullscreen
        </Button>
      </Group>
      <Group grow sx={{ flexGrow: 1, flexShrink: 0 }}>
        <Panel {...panel} />
      </Group>
    </Stack>
  );
}
