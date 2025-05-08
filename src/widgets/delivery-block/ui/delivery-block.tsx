import { useTableData } from '@/entities/user-table';
import { Box, Button, Grid, NumberInput, Select, Text } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';

interface DeliveryBlockProps {
  value: any;
  onChange: (value: any) => void;
  onSubmit: (values: any) => void;
}

export const DeliveryBlock = ({ value, onChange, onSubmit }: DeliveryBlockProps) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: value,
  });

  // Получаем данные типов транспорта
  const { data: transportTypes = [] } = useTableData('type_transport');

  // Преобразуем данные для селекта
  const transportOptions = transportTypes.map((type: any) => ({
    value: type.id_type_transport,
    label: type.name,
  }));

  const onSubmitHandler = handleSubmit((data) => {
    // Обработка значений
    const processedValues = Object.entries(data).reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        // Обработка массивов (если есть multiselect)
        // @ts-ignore
        acc[key] = value.map((item) => {
          // @ts-ignore
          const option = options?.find((opt) => opt.value === item || opt.label === item);
          return option?.value || item;
        });
      } else {
        // @ts-ignore
        acc[key] = value;
      }
      return acc;
    }, {});

    onSubmit(processedValues);
  });

  const handleChange = (field: string, newValue: any) => {
    onChange({
      ...value,
      [field]: newValue,
    });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Box p="md" style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: '8px' }}>
        <Text fw={500} mb="md" size="lg">
          Доставка
        </Text>

        <Grid>
          {/* Первая строка */}
          <Grid.Col span={4}>
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <NumberInput label="Мест" {...field} onChange={(val) => field.onChange(val)} />
              )}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Controller
              name="weight"
              control={control}
              render={({ field }) => (
                <NumberInput label="Вес" {...field} onChange={(val) => field.onChange(val)} />
              )}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Controller
              name="volume"
              control={control}
              render={({ field }) => (
                <NumberInput label="Объём" {...field} onChange={(val) => field.onChange(val)} />
              )}
            />
          </Grid.Col>

          {/* Китай-Россия */}
          <Grid.Col span={12}>
            <Text>Китай-Россия:</Text>
          </Grid.Col>
          <Grid.Col span={12}>
            <Controller
              name="id_type_transport"
              control={control}
              render={({ field }) => (
                <Select
                  label="Транспорт"
                  data={transportOptions}
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                  clearable
                />
              )}
            />
          </Grid.Col>

          {/* Тарифы и значения */}
          <Grid.Col span={4}>
            <Text>Тариф($)</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text>Вход</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text>Выход</Text>
          </Grid.Col>

          {/* Вход */}
          <Grid.Col span={4}>
            <Controller
              name="tariff_in"
              control={control}
              render={({ field }) => (
                <NumberInput label="Вход" {...field} onChange={(val) => field.onChange(val)} />
              )}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Controller
              name="delivery_ch_in"
              control={control}
              render={({ field }) => <NumberInput value={field.value} readOnly />}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Controller
              name="delivery_ch_out"
              control={control}
              render={({ field }) => <NumberInput value={field.value} readOnly />}
            />
          </Grid.Col>

          {/* Выход */}
          <Grid.Col span={4}>
            <Controller
              name="tariff_out"
              control={control}
              render={({ field }) => (
                <NumberInput label="Выход" {...field} onChange={(val) => field.onChange(val)} />
              )}
            />
          </Grid.Col>

          {/* Дополнительные поля */}
          <Grid.Col span={12}>
            <Grid>
              <Grid.Col span={6}>
                <Text>Страхование груза:</Text>
              </Grid.Col>
              <Grid.Col span={3}>
                <Controller
                  name="insurance_in"
                  control={control}
                  render={({ field }) => (
                    <NumberInput {...field} onChange={(val) => field.onChange(val)} />
                  )}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Controller
                  name="insurance_out"
                  control={control}
                  render={({ field }) => (
                    <NumberInput {...field} onChange={(val) => field.onChange(val)} />
                  )}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <Text>Упаковка груза:</Text>
              </Grid.Col>
              <Grid.Col span={3}>
                <Controller
                  name="packing_in"
                  control={control}
                  render={({ field }) => (
                    <NumberInput {...field} onChange={(val) => field.onChange(val)} />
                  )}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Controller
                  name="packing_out"
                  control={control}
                  render={({ field }) => (
                    <NumberInput {...field} onChange={(val) => field.onChange(val)} />
                  )}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <Text>Доставка по Китаю:</Text>
              </Grid.Col>
              <Grid.Col span={3}>
                <Controller
                  name="loading_in"
                  control={control}
                  render={({ field }) => (
                    <NumberInput {...field} onChange={(val) => field.onChange(val)} />
                  )}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Controller
                  name="loading_out"
                  control={control}
                  render={({ field }) => (
                    <NumberInput {...field} onChange={(val) => field.onChange(val)} />
                  )}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <Text>Погрузка на складах:</Text>
              </Grid.Col>
              <Grid.Col ml={87} span={3}>
                <NumberInput value={0} readOnly />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* Итого */}
          <Grid.Col span={6}>
            <Text fw={500}>Итого:</Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <Controller
              name="total_in"
              control={control}
              render={({ field }) => <NumberInput value={field.value} readOnly />}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <Controller
              name="total_out"
              control={control}
              render={({ field }) => <NumberInput value={field.value} readOnly />}
            />
          </Grid.Col>

          {/* Дельта и курс */}
          <Grid.Col span={3}>
            <Text>Дельта</Text>
            <Controller
              name="delta"
              control={control}
              render={({ field }) => <NumberInput value={field.value} readOnly />}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <Text>Курс</Text>
            <Controller
              name="rate"
              control={control}
              render={({ field }) => (
                <NumberInput {...field} onChange={(val) => field.onChange(val)} />
              )}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <Text>Доп.расх(₽)</Text>
            <Controller
              name="additional_expenses"
              control={control}
              render={({ field }) => (
                <NumberInput {...field} onChange={(val) => field.onChange(val)} />
              )}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <Text>Дельта(₽)</Text>
            {/* <Controller
              name="delta_rub"
              control={control}
              render={({ field }) => <NumberInput value={field.value} readOnly />}
            /> */}
          </Grid.Col>

          {/* Кнопка сохранения */}
          <Grid.Col span={12}>
            <Button type="submit" disabled={!isDirty} fullWidth>
              Сохранить
            </Button>
          </Grid.Col>
        </Grid>
      </Box>
    </form>
  );
};
