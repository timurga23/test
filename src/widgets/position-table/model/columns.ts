import { Position } from '@/enteties';
import { ITableColumn } from '@/shared/ui/table/table';

export const POSITION_COLUMNS: ITableColumn<Position>[] = [
  {
    key: 'name',
    label: 'Название должности',
  },
]; 