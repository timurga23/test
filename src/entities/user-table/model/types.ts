import { IColumn } from '@/shared';

type TableUpdate = {
  filter: IColumn[];
  row: IColumn[];
};

export type TableUpdates = TableUpdate[];

export type TableRowAdd = { row: IColumn[] }[];
