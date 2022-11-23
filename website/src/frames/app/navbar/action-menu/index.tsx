import { ActionIcon, Menu } from '@mantine/core';
import { Edit, FileImport, FileInfo, Menu2 } from 'tabler-icons-react';
import { useAccountContext } from '../../../require-auth/account-context';
import { DeleteDashboard } from './delete-dashboard';

interface IActionMenu {
  id: string;
  name: string;
  preset: boolean;
  openOverwriteModal: (id: string, name: string) => void;
}
export const ActionMenu = ({ id, name, preset, openOverwriteModal }: IActionMenu) => {
  const { canEdit } = useAccountContext();

  if (!canEdit || preset) {
    return null;
  }
  return (
    <Menu shadow="md" width={220} withinPortal trigger="hover">
      <Menu.Target>
        <ActionIcon
          variant="subtle"
          color="blue"
          sx={{
            width: '42px',
            height: '42px',
          }}
        >
          <Menu2 size={18} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item disabled icon={<Edit size={16} />}>
          Rename
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={() => openOverwriteModal(id, name)} icon={<FileImport size={16} />}>
          Overwrite with JSON file
        </Menu.Item>
        <Menu.Divider />
        <DeleteDashboard id={id} />
      </Menu.Dropdown>
    </Menu>
  );
};
