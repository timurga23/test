import { TableSort } from '@/shared/ui';
import { Button, Flex } from '@mantine/core';
import { columns, data } from '../../model/constant';


export function CustomerEntranceTable() {
  return (
    <Flex direction='column' gap='8px' align='flex-end'>
      <TableSort 
        data={data} 
        columns={columns}
      />
      <Button>
        Добавить поступление
      </Button>
    </Flex>
  );
}