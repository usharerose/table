import { Box, Button, Checkbox, Flex, Group, Stack, Table, Text } from '@mantine/core';
import { IconCode } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import { useMemo, useState } from 'react';
import { filterTypeNames } from '~/components/filter/filter-settings/filter-setting';
import { useEditDashboardContext } from '~/contexts';

export const EditFilters = observer(() => {
  const [value, setValue] = useState<string[]>([]);
  const model = useEditDashboardContext();
  const navigateToFilter = (filterID: string) => {
    model.editor.setPath(['_FILTERS_', filterID]);
  };

  const downloadSchema = () => {
    model.content.filters.downloadSchema(value);
  };

  const allIDs = useMemo(() => {
    return model.content.filters.sortedList.map((q) => q.id);
  }, [model.content.filters.sortedList]);

  const selectAll = () => {
    setValue(allIDs);
  };
  const selectNone = () => {
    setValue([]);
  };

  return (
    <Stack sx={{ height: '100%' }} spacing="sm" pb={'59px'}>
      <Box pt={9} pb={8} sx={{ borderBottom: '1px solid #eee' }}>
        <Text px="md" align="left" sx={{ userSelect: 'none', cursor: 'default' }}>
          Manage Filters
        </Text>
      </Box>
      <Flex justify="space-between" align="center" px={12}>
        <Group position="left">
          <Button.Group>
            <Button variant="default" size="xs" onClick={selectAll}>
              Select All
            </Button>
            <Button variant="default" size="xs" onClick={selectNone}>
              Clear Selection
            </Button>
          </Button.Group>
          <Button
            // variant="subtle"
            size="xs"
            color="blue"
            leftIcon={<IconCode size={14} />}
            disabled={value.length === 0}
            onClick={downloadSchema}
          >
            Download Schema
          </Button>
        </Group>
      </Flex>
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Checkbox.Group size="xs" value={value} onChange={setValue}>
          <Table fontSize="sm" highlightOnHover sx={{ tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: '40px' }}></th>
                <th style={{ width: '300px' }}>Label</th>
                <th>Key</th>
                <th style={{ width: '100px' }}>Widget</th>
                <th style={{ width: '300px', paddingLeft: '24px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {model.content.filters.sortedList.map((f) => {
                return (
                  <tr key={f.id}>
                    <td>
                      <Checkbox value={f.id} styles={{ input: { cursor: 'pointer' } }} />
                    </td>
                    <td>{f.label}</td>
                    <td>{f.key}</td>
                    <td>{filterTypeNames[f.type]}</td>
                    <td>
                      <Button variant="subtle" size="xs" onClick={() => navigateToFilter(f.id)}>
                        Open
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Checkbox.Group>
      </Box>
    </Stack>
  );
});
