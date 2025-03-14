import { ColumnTypeToValue } from '@/shared';
import {
  Button,
  NumberInput,
  PasswordInput,
  Select,
  Stack,
  Switch,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Controller, FieldValues, useForm } from 'react-hook-form';

// Описание структуры колонки
export type BaseColumn<T extends keyof ColumnTypeToValue> = {
  type: T;
  unique?: boolean;
  nullable?: boolean;
  defaultValue?: ColumnTypeToValue[T];
  label?: string;
  fieldType?: 'text' | 'password' | 'select' | 'date' | 'switch' | 'number';
  options?: { value: string; label: string }[];
  group?: string;
  placeholder?: string;
};

type InferColumnType<T extends BaseColumn<keyof ColumnTypeToValue>> =
  T extends BaseColumn<infer U> ? ColumnTypeToValue[U] : never;

// Тип для значений формы
export type FormValues<T extends Record<string, BaseColumn<keyof ColumnTypeToValue>>> = {
  [K in keyof T]: InferColumnType<T[K]>;
} & FieldValues;

// Универсальная форма
interface UniversalFormProps<T extends Record<string, BaseColumn<keyof ColumnTypeToValue>>> {
  columns: T;
  defaultValues?: Partial<Record<keyof T, any>>;
  onSubmit: (data: FormValues<T>) => void;
  isLoading?: boolean;
}

export function UniversalForm<T extends Record<string, BaseColumn<keyof ColumnTypeToValue>>>({
  columns,
  defaultValues,
  onSubmit,
  isLoading = false,
}: UniversalFormProps<T>) {
  // Добавим отладочный вывод
  console.log('Form defaultValues:', defaultValues);
  console.log('Form columns:', columns);

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormValues<T>>({
    // @ts-ignore
    defaultValues,
  });

  const onSubmitHandler = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack gap="md">
        {/* Основные поля */}
        {Object.entries(columns)
          .filter(([_, column]) => !column.group)
          .map(([key, column]) => (
            <Controller<FormValues<T>>
              key={key}
              // @ts-ignore
              name={key as keyof FormValues<T>}
              control={control}
              render={({ field }) => {
                // Добавим отладочный вывод для каждого поля
                console.log(`Field ${key}:`, field.value);

                switch (column.type) {
                  case 'TEXT':
                    if (column.fieldType === 'select' && column.options) {
                      return (
                        <Select
                          label={column.label || key}
                          data={column.options}
                          value={String(field.value || '')}
                          onChange={(newValue) => field.onChange(newValue || '')}
                          clearable
                          placeholder={column.placeholder}
                        />
                      );
                    }
                    return column.fieldType === 'password' ? (
                      <PasswordInput
                        label={column.label || key}
                        value={String(field.value || '')}
                        onChange={(e) => field.onChange(e.currentTarget.value)}
                        placeholder={column.placeholder}
                      />
                    ) : (
                      <TextInput
                        label={column.label || key}
                        value={String(field.value || '')}
                        onChange={(e) => field.onChange(e.currentTarget.value)}
                        placeholder={column.placeholder}
                      />
                    );
                  case 'DATE':
                    return (
                      <DateInput
                        {...field}
                        label={column.label}
                        value={field?.value ? new Date(field?.value as string) : null}
                        onChange={(date) => {
                          field.onChange(date);
                        }}
                        valueFormat="YYYY-MM-DD"
                        clearable
                        placeholder={column.placeholder}
                      />
                    );
                  case 'BOOLEAN':
                    return (
                      <Switch
                        label={column.label || key}
                        checked={Boolean(!!field.value)}
                        onChange={(event) => field.onChange(event.currentTarget.checked)}
                      />
                    );
                  case 'INTEGER':
                    return (
                      <NumberInput
                        {...field}
                        label={column.label}
                        value={Number(field.value || 0)}
                        onChange={(value) => field.onChange(value)}
                        placeholder={column.placeholder}
                      />
                    );
                  default:
                    return (
                      <TextInput
                        label={column.label || key}
                        value={String(field.value || '')}
                        onChange={(e) => field.onChange(e.currentTarget.value)}
                        placeholder={column.placeholder}
                      />
                    );
                }
              }}
            />
          ))}

        {/* Позиции */}
        {Object.entries(columns).some(([_, column]) => column.group === 'positions') && (
          <>
            <div>Должности:</div>
            <Stack gap="xs">
              {Object.entries(columns)
                .filter(([_, column]) => column.group === 'positions')
                .map(([key, column]) => (
                  <Controller<FormValues<T>>
                    key={key}
                    // @ts-ignore
                    name={key as keyof FormValues<T>}
                    control={control}
                    render={({ field }) => {
                      // Добавим отладочный вывод для каждого поля
                      console.log(`Field ${key}:`, field.value);

                      switch (column.type) {
                        case 'TEXT':
                          if (column.fieldType === 'select' && column.options) {
                            return (
                              <Select
                                label={column.label || key}
                                data={column.options}
                                value={String(field.value || '')}
                                onChange={(newValue) => field.onChange(newValue || '')}
                                clearable
                                placeholder={column.placeholder}
                              />
                            );
                          }
                          return column.fieldType === 'password' ? (
                            <PasswordInput
                              label={column.label || key}
                              value={String(field.value || '')}
                              onChange={(e) => field.onChange(e.currentTarget.value)}
                              placeholder={column.placeholder}
                            />
                          ) : (
                            <TextInput
                              label={column.label || key}
                              value={String(field.value || '')}
                              onChange={(e) => field.onChange(e.currentTarget.value)}
                              placeholder={column.placeholder}
                            />
                          );
                        case 'DATE':
                          return (
                            <DateInput
                              {...field}
                              label={column.label}
                              value={field?.value ? new Date(field?.value as string) : null}
                              onChange={(date) => {
                                field.onChange(date);
                              }}
                              valueFormat="YYYY-MM-DD"
                              clearable
                              placeholder={column.placeholder}
                            />
                          );
                        case 'BOOLEAN':
                          return (
                            <Switch
                              label={column.label || key}
                              checked={Boolean(field.value)}
                              onChange={(event) => field.onChange(event.currentTarget.checked)}
                            />
                          );
                        case 'INTEGER':
                          return (
                            <NumberInput
                              {...field}
                              label={column.label}
                              value={Number(field.value || 0)}
                              onChange={(value) => field.onChange(value)}
                              placeholder={column.placeholder}
                            />
                          );
                        default:
                          return (
                            <TextInput
                              label={column.label || key}
                              value={String(field.value || '')}
                              onChange={(e) => field.onChange(e.currentTarget.value)}
                              placeholder={column.placeholder}
                            />
                          );
                      }
                    }}
                  />
                ))}
            </Stack>
          </>
        )}

        <Button type="submit" disabled={!isDirty} loading={isLoading}>
          Сохранить
        </Button>
      </Stack>
    </form>
  );
}
