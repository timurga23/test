import { ColumnTypeToValue } from '@/shared/model';
import { BaseColumn } from '@/shared/ui/universal-form/universal-form';

export const POSITION_FORM_COLUMNS: Record<string, BaseColumn<keyof ColumnTypeToValue>> = {
  name: {
    type: 'TEXT',
    nullable: false,
    label: 'Название должности',
  },
};
