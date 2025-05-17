import { ColumnType, ColumnTypeToValue } from '@/shared';
import { DynamicInputs } from '@/shared/ui/dynamic-inputs/dynamic-inputs';
import { PositionsEditor } from '@/shared/ui/positions-editor/positions-editor';
import { DeliveryBlock } from '@/widgets';
import {
  Button,
  MultiSelect,
  NumberInput,
  PasswordInput,
  Select,
  Stack,
  Switch,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Controller, FieldValues, useForm } from 'react-hook-form';

type FieldType =
  | 'text'
  | 'password'
  | 'select'
  | 'multiselect'
  | 'date'
  | 'switch'
  | 'number'
  | 'dynamic-inputs'
  | 'positions'
  | 'delivery-block'
  | 'CUSTOM';

export type BaseColumn<T extends keyof ColumnTypeToValue> = {
  type: T;
  unique?: boolean;
  nullable?: boolean;
  defaultValue?: ColumnTypeToValue[T];
  label?: string;
  fieldType?: FieldType;
  options?: { value: string; label: string }[];
  group?: string;
  placeholder?: string;
  disabled?: boolean;
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
  const {
    control,
    handleSubmit,
    formState: { isDirty },
    getValues,
  } = useForm<FormValues<T>>({
    // @ts-ignore
    defaultValues,
  });

  const onSubmitHandler = handleSubmit((data) => {
    const processedValues = { ...data };

    // Обработка значений для multiselect полей
    Object.entries(columns).forEach(([key, column]) => {
      if (column?.fieldType === 'multiselect') {
        // @ts-ignore
        processedValues[key] = data[key].map(
          (item: any) =>
            column.options?.find((option) => option.value === item || option.label === item)?.value
        );
      }

      if (column?.fieldType === 'select') {
        // @ts-ignore
        processedValues[key] = column.options?.find(
          (option) => option.label === data[key] || option.value === data[key]
        )?.value;
      }
    });

    onSubmit(processedValues);
  });

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack gap="md">
        {/* Основные поля */}
        {Object.entries(columns)
          .filter(([_, column]) => !column?.group && !column?.hidden)
          .map(([key, column]) => (
            <Controller<FormValues<T>>
              key={key}
              // @ts-ignore
              name={key as keyof FormValues<T>}
              control={control}
              render={({ field }) => {
                switch (column.type as ColumnType | FieldType) {
                  case 'TEXT':
                    if (column?.fieldType === 'select' && column.options) {
                      const value =
                        column.options?.find((option) => option.label === field.value)?.value || '';

                      return (
                        <Select
                          label={column.label || key}
                          data={column.options}
                          value={value}
                          onChange={(newValue) => field.onChange(newValue || '')}
                          clearable
                          placeholder={column.placeholder}
                          disabled={column.disabled}
                        />
                      );
                    }
                    if (column?.fieldType === 'multiselect' && column.options) {
                      const value = Array.isArray(field.value)
                        ? field.value.map((id) => {
                            // Ищем соответствующую опцию по value (id) и берем её label
                            // @ts-ignore
                            const option = column.options.find((opt) => opt.value === id);
                            return option?.label || '';
                          })
                        : [];

                      return (
                        <MultiSelect
                          label={column.label || key}
                          data={column.options}
                          value={value}
                          onChange={(newValue) => field.onChange(newValue)}
                          clearable
                          placeholder={column.placeholder}
                          disabled={column.disabled}
                        />
                      );
                    }
                    return column?.fieldType === 'password' ? (
                      <PasswordInput
                        label={column.label || key}
                        value={String(field.value || '')}
                        onChange={(e) => field.onChange(e.currentTarget.value)}
                        placeholder={column.placeholder}
                        disabled={column.disabled}
                      />
                    ) : (
                      <TextInput
                        label={column.label || key}
                        value={String(field.value || '')}
                        onChange={(e) => field.onChange(e.currentTarget.value)}
                        placeholder={column.placeholder}
                        disabled={column.disabled}
                      />
                    );
                  case 'UUID':
                    if (column?.fieldType === 'multiselect' && column.options) {
                      const value =
                        Array.isArray(field.value) &&
                        !field.value.some((item) => typeof item === 'string' && !item)
                          ? field.value.map((item) => {
                              // Находим опцию по значению
                              const option = column.options?.find(
                                (option) => option.label === item.name || option.value === item.name
                              );
                              return option?.label ?? item;
                            })
                          : [];

                      return (
                        <MultiSelect
                          label={column.label || key}
                          data={column.options}
                          value={value}
                          onChange={(newValue) => field.onChange(newValue)}
                          clearable
                          placeholder={column.placeholder}
                          disabled={column.disabled}
                        />
                      );
                    }

                    if (column?.fieldType === 'dynamic-inputs') {
                      return (
                        <DynamicInputs
                          label={column.label}
                          placeholder={column.placeholder}
                          value={Array.isArray(field.value) ? field.value : []}
                          onChange={(newValue) => field.onChange(newValue)}
                        />
                      );
                    }

                    if (column?.fieldType === 'positions') {
                      return (
                        <PositionsEditor
                          // @ts-ignore
                          value={field.value || []}
                          onChange={(newValue) => field.onChange(newValue)}
                          // @ts-ignore
                          orderId={defaultValues?.id_order}
                        />
                      );
                    }

                    const linkedValue = getValues()[column?.relation?.linkedField?.mapping];

                    const value =
                      column.options?.find(
                        (option) =>
                          option.label === field.value ||
                          option.value === field.value ||
                          option.label === linkedValue ||
                          option.value === linkedValue
                      )?.value || null;

                    return (
                      <Select
                        label={column?.label || key}
                        data={column?.options || []}
                        value={value}
                        onChange={(newValue) => field.onChange(newValue || '')}
                        clearable
                        placeholder={column?.placeholder}
                        disabled={column?.disabled}
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
                        disabled={column.disabled}
                      />
                    );
                  case 'BOOLEAN':
                    return (
                      <Switch
                        label={column.label || key}
                        checked={Boolean(field.value)}
                        onChange={(event) => field.onChange(event.currentTarget.checked)}
                        disabled={column.disabled}
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
                        disabled={column.disabled}
                      />
                    );
                  case 'CUSTOM':
                    // @ts-ignore
                    return <DeliveryBlock value={defaultValues} onChange={field.onChange} />;

                  default:
                    return (
                      <TextInput
                        label={column.label || key}
                        value={String(field.value || '')}
                        onChange={(e) => field.onChange(e.currentTarget.value)}
                        placeholder={column.placeholder}
                        disabled={column.disabled}
                      />
                    );
                }
              }}
            />
          ))}

        <Button type="submit" disabled={!isDirty} loading={isLoading}>
          Сохранить
        </Button>
      </Stack>
    </form>
  );
}
