// Определяем возможные типы полей
export type ColumnType =
  | 'UUID_AUTO_GENERATE'
  | 'TEXT'
  | 'DATE'
  | 'BOOLEAN'
  | 'INTEGER'
  | 'BIG_INTEGER'
  | 'INCREMENT'
  | 'UUID';

// Типы значений для каждого типа колонки
export type ColumnTypeToValue = {
  TEXT: string;
  UUID: string;
  UUID_AUTO_GENERATE: string;
  DATE: string;
  BOOLEAN: boolean;
  INTEGER: number;
  BIG_INTEGER: number;
  INCREMENT: number;
};

export interface ITable {
  name: string;
  columns: IBaseColumn[];
}

// Базовый интерфейс для колонки
export interface IBaseColumn {
  name: string;
  unique: boolean | null;
  nullable: boolean;
  defaultValue: unknown;
  type: ColumnType;
}
