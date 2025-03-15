import { ColumnTypeToValue } from '@/shared';
import { BaseColumn } from '@/shared/ui/universal-form/universal-form';

export const OPERATION_CARD_FORM_COLUMNS: Record<string, BaseColumn<keyof ColumnTypeToValue>> = {
  id_card: {
    type: 'TEXT',
    label: 'Карта',
    fieldType: 'select',
    options: [], // Будет заполняться динамически
  },
  id_type_operation: {
    type: 'TEXT',
    label: 'Тип операции',
    fieldType: 'select',
    options: [], // Будет заполняться динамически
  },
  date: {
    type: 'BIG_INTEGER',
    label: 'Дата',
    fieldType: 'date',
  },
  summ: {
    type: 'BIG_INTEGER',
    label: 'Сумма',
    fieldType: 'number',
  },
  point_summ: {
    type: 'BIG_INTEGER',
    label: 'Баллы',
    fieldType: 'number',
  },
  description: {
    type: 'TEXT',
    label: 'Описание',
  },
};
