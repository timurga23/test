import { ColumnTypeToValue } from '@/shared';
import { Button, PasswordInput, Select, Stack, Switch, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Controller, FieldValues, useForm } from 'react-hook-form';

// Описание структуры колонки
export type BaseColumn<T extends keyof ColumnTypeToValue> = {
  type: T;
  unique?: boolean;
  nullable?: boolean;
  defaultValue?: ColumnTypeToValue[T];
  label?: string;
  fieldType?: 'text' | 'password' | 'select';
  options?: { value: string; label: string }[];
  group?: string;
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
  defaultValues?: Partial<FormValues<T>>;
  onSubmit: (data: FormValues<T>) => void;
  isLoading?: boolean;
}

export function UniversalForm<T extends Record<string, BaseColumn<keyof ColumnTypeToValue>>>({
  columns,
  defaultValues = {},
  onSubmit,
  isLoading = false,
}: UniversalFormProps<T>) {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormValues<T>>({
    // @ts-ignore
    defaultValues: defaultValues as FormValues<T>,
  });

  const onSubmitHandler = handleSubmit((data) => {
    onSubmit(data as FormValues<T>);
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
              // @ts-ignore
              defaultValue={column.defaultValue ?? null}
              render={({ field: { value, onChange, ...field } }) => {
                switch (column.type) {
                  case 'TEXT':
                    if (column.fieldType === 'select') {
                      return (
                        <Select
                          label={column.label || key}
                          data={column.options || []}
                          value={String(value || '')}
                          onChange={(newValue) => {
                            onChange(newValue || null);
                          }}
                          clearable
                          {...field}
                        />
                      );
                    }
                    return column.fieldType === 'password' ? (
                      <PasswordInput
                        label={column.label || key}
                        value={String(value) ?? ''}
                        onChange={onChange}
                        {...field}
                      />
                    ) : (
                      <TextInput
                        label={column.label || key}
                        value={String(value) ?? ''}
                        onChange={onChange}
                        {...field}
                      />
                    );
                  case 'DATE':
                    return (
                      <DateInput
                        label={column.label || key}
                        value={value ? new Date(String(value)) : null}
                        onChange={(date) => onChange(date?.toISOString())}
                        {...field}
                      />
                    );
                  case 'BOOLEAN':
                    return (
                      <Switch
                        label={column.label || key}
                        checked={Boolean(value)}
                        onChange={(event) => onChange(event.currentTarget.checked)}
                      />
                    );
                  default:
                    return (
                      <TextInput
                        label={column.label || key}
                        value={String(value) ?? ''}
                        onChange={onChange}
                        {...field}
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
                    // @ts-ignore
                    defaultValue={column.defaultValue ?? null}
                    render={({ field: { value, onChange, ...field } }) => {
                      switch (column.type) {
                        case 'TEXT':
                          if (column.fieldType === 'select') {
                            return (
                              <Select
                                label={column.label || key}
                                data={column.options || []}
                                value={String(value || '')}
                                onChange={(newValue) => {
                                  onChange(newValue || null);
                                }}
                                clearable
                                {...field}
                              />
                            );
                          }
                          return column.fieldType === 'password' ? (
                            <PasswordInput
                              label={column.label || key}
                              value={String(value) ?? ''}
                              onChange={onChange}
                              {...field}
                            />
                          ) : (
                            <TextInput
                              label={column.label || key}
                              value={String(value) ?? ''}
                              onChange={onChange}
                              {...field}
                            />
                          );
                        case 'DATE':
                          return (
                            <DateInput
                              label={column.label || key}
                              value={value ? new Date(String(value)) : null}
                              onChange={(date) => onChange(date?.toISOString())}
                              {...field}
                            />
                          );
                        case 'BOOLEAN':
                          return (
                            <Switch
                              label={column.label || key}
                              checked={Boolean(value)}
                              onChange={(event) => onChange(event.currentTarget.checked)}
                            />
                          );
                        default:
                          return (
                            <TextInput
                              label={column.label || key}
                              value={String(value) ?? ''}
                              onChange={onChange}
                              {...field}
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
