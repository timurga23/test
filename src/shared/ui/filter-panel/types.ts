export type FilterType = 'select' | 'date-range';

export interface BaseFilter {
  type: FilterType;
  field: string;
  label: string;
}

export interface SelectFilter extends BaseFilter {
  type: 'select';
  relationKey: string | string[];
  getOptions: (data: any[]) => { value: string; label: string }[];
  searchField?: string;
  valueField?: string;
}

export interface DateRangeFilter extends BaseFilter {
  type: 'date-range';
}

export type Filter = SelectFilter | DateRangeFilter;

export interface QuickFilter {
  id: string;
  label: string;
  field: string;
  value: string | null;
  color?: string; // для возможности кастомизации цвета кнопки
}

// Также добавим тип для функции создания фильтров
export type QuickFilterCreator = (relationData: any[]) => QuickFilter[];
