import { useTableData } from '@/entities/user-table';
import { UniversalEditModal } from '@/shared/ui';
import { TableSort } from '@/shared/ui/table/table';
import { ActionIcon, Group } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

interface CrudTableProps<T, N> {
  tableName: string;
  columns: any[];
  formColumns: Record<string, any>;
  idField: string;
  normalizeData?: (data: T[], relations?: any) => N[];
  relations?: {
    [key: string]: string;
  };
  showAddButton?: boolean;
  // Опциональный кастомный компонент модального окна
  CustomEditModal?: React.ComponentType<any>;
}

export const CrudTable = <T extends { [key: string]: any }, N = T>({
  tableName,
  columns,
  formColumns,
  idField,
  normalizeData,
  relations = {},
  showAddButton = true,
  CustomEditModal,
}: CrudTableProps<T, N>) => {
  const [selected, setSelected] = useState<T | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  const { data, refetch } = useTableData<T>(tableName);
  const relationsData = Object.entries(relations).reduce((acc, [table]) => {
    const { data: relationData } = useTableData(table);
    return { ...acc, [table]: relationData };
  }, {});

  const normalizedData = normalizeData ? normalizeData(data || [], relationsData) : data || [];

  const handleEdit = (item: N) => {
    const originalItem =
      // @ts-ignore
      data?.find((i) => i[`id_${tableName}`] === item[`id_${tableName}`]) || null;
    setSelected(originalItem);
    setModalOpened(true);
  };

  const handleAdd = () => {
    setSelected(null);
    setModalOpened(true);
  };

  const modalProps = {
    opened: modalOpened,
    onClose: () => setModalOpened(false),
    data: selected,
    refetch,
    tableName,
    formColumns,
    idField,
  };

  return (
    <>
      {showAddButton && (
        <Group mb="md">
          <ActionIcon variant="filled" color="blue" onClick={handleAdd} size="lg">
            <IconPlus size={20} />
          </ActionIcon>
        </Group>
      )}

      {/* @ts-ignore */}
      <TableSort data={normalizedData} columns={columns} onRowClick={handleEdit} />

      {CustomEditModal ? (
        <CustomEditModal {...modalProps} />
      ) : (
        <UniversalEditModal {...modalProps} />
      )}
    </>
  );
};
