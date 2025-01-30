import { CustomerSpecModal } from '@/features';
import { TableSort } from '@/shared/ui';
import { Pagination } from '@mantine/core';
import { useState } from 'react';
import { columns, data } from '../../model/constant';
import { ICustomerSpec } from '../../model/types';


export function CustomerSpecTable() {
  const [activeSpec, setActiveSpec] = useState<ICustomerSpec | null>(null);
  
  return (
    <>
      <TableSort 
        data={data} 
        columns={columns}
        onRowClick={setActiveSpec}
        isSearchable
      />
      <Pagination total={10} />
      {activeSpec && <CustomerSpecModal activeSpec={activeSpec} setActiveSpec={setActiveSpec} />}
      
    </>
  );
}
