export type FilterType = 'select' | 'date-range';

export interface BaseFilter {
  type: FilterType;
  field: string;
  label: string;
}

export interface SelectFilter extends BaseFilter {
  type: 'select';
  relationKey: string;
  getOptions: (data: any[]) => { value: string; label: string }[];
  searchField?: string;
}

export interface DateRangeFilter extends BaseFilter {
  type: 'date-range';
}

export type Filter = SelectFilter | DateRangeFilter;
