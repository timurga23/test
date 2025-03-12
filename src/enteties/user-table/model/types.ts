import { IColumn, TableRow } from '@/shared';

type TableUpdate = {
  filter: IColumn[];
  row: IColumn[];
};

export type TableUpdates = TableUpdate[];

export type TableRowAdd = TableRow[];
