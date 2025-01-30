import { TableSort } from '@/shared/ui';
import { columns, data } from '../../model/constant';


export function CustomerPaymentTable() {
  return (
      <TableSort 
        data={data} 
        columns={columns}
      />
  );
}