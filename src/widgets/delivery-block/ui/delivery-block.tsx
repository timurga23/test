import { useTableData } from '@/entities/user-table';
import { Box, Button, Grid, NumberInput, Select, Text } from '@mantine/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

interface DeliveryBlockProps {
  value: any;
  onChange: (value: any) => void;
  onSubmit: (values: any) => void;
}

interface ProcessedValues {
  [key: string]: any;
}

interface Option {
  value: string | number;
  label: string;
}

interface FormValues {
  weight: number;
  volume: number;
  tariff_in: number;
  tariff_out: number;
  delivery_ch_in: number;
  delivery_ch_out: number;
  insurance_in: number;
  insurance_out: number;
  packing_in: number;
  packing_out: number;
  loading_in: number;
  loading_out: number;
  rate: number;
  outgo: number;
  quantity: number;
  id_type_transport: string;
  [key: string]: any;
}

const POINT_COLUMNS = [
  'point_weight',
  'point_volume',
  'point_tariff_in',
  'point_tariff_out',
  'point_insurance_in',
  'point_insurance_out',
  'point_loading_out',
  'point_rate',
  'point_outgo',
  'point_price',
  'point_price_client',
];

export const DeliveryBlock = ({ value, onSubmit }: DeliveryBlockProps) => {
  const normalizedValue = Object.entries(value).reduce<FormValues>((acc, [key, valueItem]) => {
    if (POINT_COLUMNS.includes(`point_${key}`)) {
      const point = value[`point_${key}`] as number;

      if (point) {
        acc[key] = Number(((valueItem as number) / Math.pow(10, point)).toFixed(point));
      } else {
        acc[key] = valueItem as any;
      }
    } else {
      acc[key] = valueItem as any;
    }

    return acc;
  }, {} as FormValues);

  console.log(112, value, normalizedValue);

  const {
    control,
    handleSubmit,
    watch,
    formState: { isDirty },
  } = useForm<FormValues>({
    defaultValues: normalizedValue,
  });

  // Получаем данные типов транспорта
  const { data: transportTypes = [] } = useTableData('type_transport');

  // Преобразуем данные для селекта
  const transportOptions = transportTypes.map((type: any) => ({
    value: type.id_type_transport,
    label: type.name,
  }));

  // Следим за изменениями нужных полей
  const weight = watch('weight') || 0;
  const tariffIn = watch('tariff_in') || 0;
  const tariffOut = watch('tariff_out') || 0;
  const deliveryChIn = watch('delivery_ch_in') || 0;
  const deliveryChOut = watch('delivery_ch_out') || 0;
  const insuranceIn = watch('insurance_in') || 0;
  const insuranceOut = watch('insurance_out') || 0;
  const packingIn = watch('packing_in') || 0;
  const packingOut = watch('packing_out') || 0;
  const loadingIn = watch('loading_in') || 0;
  const loadingOut = watch('loading_out') || 0;
  const rate = watch('rate') || 0;
  const outgo = watch('outgo') || 0;

  const onSubmitHandler = handleSubmit((data) => {
    // Обработка значений
    const processedValues = Object.entries(data).reduce((acc: ProcessedValues, [key, value]) => {
      if (Array.isArray(value)) {
        // Обработка массивов (если есть multiselect)
        acc[key] = value.map((item) => {
          const option = transportOptions.find(
            (opt: Option) => opt.value === item || opt.label === item
          );
          return option?.value || item;
        });
      } else if (typeof value === 'number' && key.startsWith('point_')) {
        // Пропускаем point_ поля
        acc[key] = value;
      } else if (typeof value === 'number' && POINT_COLUMNS.includes(`point_${key}`)) {
        // Для числовых полей вычисляем point
        const strValue = String(value);
        const decimalPart = strValue.split('.')[1];
        const point = decimalPart ? decimalPart.length : 0;

        // Сохраняем point в соответствующее поле
        acc[`point_${key}`] = point;
        // Сохраняем значение, умноженное на 10^point
        acc[key] = Math.round(value * Math.pow(10, point));
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    // Добавляем расчетные значения price и price_client
    const weightValue = Number(weight) || 0;
    const tariffInValue = Number(tariffIn) || 0;
    const tariffOutValue = Number(tariffOut) || 0;
    const insuranceInValue = Number(insuranceIn) || 0;
    const insuranceOutValue = Number(insuranceOut) || 0;
    const packingInValue = Number(packingIn) || 0;
    const packingOutValue = Number(packingOut) || 0;
    const deliveryChInValue = Number(deliveryChIn) || 0;
    const deliveryChOutValue = Number(deliveryChOut) || 0;
    const loadingInValue = Number(loadingIn) || 0;
    const loadingOutValue = Number(loadingOut) || 0;

    // Расчет price
    const priceValue =
      weightValue * tariffInValue +
      (insuranceInValue + packingInValue + deliveryChInValue + loadingInValue) *
        Math.pow(10, value.point_price || 0);

    // Расчет price_client
    const priceClientValue =
      weightValue * tariffOutValue +
      (insuranceOutValue + packingOutValue + deliveryChOutValue + loadingOutValue) *
        Math.pow(10, value.point_price_client || 0);

    processedValues.price = String(Math.round(priceValue));
    processedValues.price_client = Math.round(priceClientValue);

    onSubmit(processedValues);
  });

  const getPointValue = (value: number, point: number = 1) => {
    if (!value) return 0;
    return Number((value / Math.pow(10, point)).toFixed(point));
  };

  const handleNumberInputChange = (onChange: (value: number) => void, value: number | string) => {
    // Преобразуем строку в число с плавающей точкой
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    onChange(numValue || 0);
  };

  const getTotalValue = (tariff: number, pointTariff: number) => {
    return getPointValue(weight, value.point_weight) * getPointValue(tariff, pointTariff);
  };

  const getTotalValueIn = () => getTotalValue(tariffIn, value.point_tariff_in).toFixed(2);

  const getTotalValueOut = () => getTotalValue(tariffOut, value.point_tariff_out).toFixed(2);

  const getTotalIn = () => {
    return (
      Number(getTotalValueIn()) +
      Number(deliveryChIn) +
      Number(insuranceIn) +
      Number(packingIn) +
      Number(loadingIn)
    ).toFixed(2);
  };

  const getTotalOut = () => {
    return (
      Number(getTotalValueOut()) +
      Number(deliveryChOut) +
      Number(insuranceOut) +
      Number(packingOut) +
      Number(loadingOut)
    ).toFixed(2);
  };

  const getDeltaRub = React.useMemo(() => {
    const weightValue = Number(weight) || 0;
    const tariffInValue = Number(tariffIn) || 0;
    const tariffOutValue = Number(tariffOut) || 0;
    const insuranceInValue = Number(insuranceIn) || 0;
    const insuranceOutValue = Number(insuranceOut) || 0;
    const packingInValue = Number(packingIn) || 0;
    const packingOutValue = Number(packingOut) || 0;
    const deliveryChInValue = Number(deliveryChIn) || 0;
    const deliveryChOutValue = Number(deliveryChOut) || 0;
    const loadingInValue = Number(loadingIn) || 0;
    const loadingOutValue = Number(loadingOut) || 0;
    const rateValue = Number(rate) || 0;
    const outgoValue = Number(outgo) || 0;

    // Расчет price
    const priceValue =
      weightValue * tariffInValue +
      (insuranceInValue + packingInValue + deliveryChInValue + loadingInValue) *
        Math.pow(10, value.point_price || 0);

    // Расчет price_client
    const priceClientValue =
      weightValue * tariffOutValue +
      (insuranceOutValue + packingOutValue + deliveryChOutValue + loadingOutValue) *
        Math.pow(10, value.point_price_client || 0);

    return (
      (priceClientValue - priceValue) * getPointValue(rateValue, value.point_rate) -
      getPointValue(outgoValue, value.point_outgo)
    ).toFixed(2);
  }, [
    weight,
    tariffIn,
    tariffOut,
    insuranceIn,
    insuranceOut,
    packingIn,
    packingOut,
    deliveryChIn,
    deliveryChOut,
    loadingIn,
    loadingOut,
    rate,
    outgo,
    value.point_price,
    value.point_price_client,
    value.point_rate,
    value.point_outgo,
    getPointValue,
  ]);

  // todo заполнить из XLS и накладная
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
                <NumberInput
                  label="Вес"
                  {...field}
                  onChange={(val) => handleNumberInputChange(field.onChange, val)}
                  decimalSeparator="."
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Controller
              name="volume"
              control={control}
              render={({ field }) => (
                <NumberInput
                  label="Объём"
                  {...field}
                  defaultValue={getPointValue(value.volume, value.point_volume)}
                  value={field.value}
                  onChange={(val) => handleNumberInputChange(field.onChange, val)}
                  decimalSeparator="."
                />
              )}
            />
          </Grid.Col>

          {/* Китай-Россия */}
          <Grid.Col span={12} pb={0}>
            <Text p={0} m={0}>
              Китай-Россия:
            </Text>
          </Grid.Col>
          <Grid.Col span={12} pt={0}>
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
                <NumberInput
                  label="Вход"
                  {...field}
                  value={field.value === undefined ? 0 : field.value}
                  defaultValue={getPointValue(value.tariff_in, value.point_tariff_in)}
                  onChange={(val) => handleNumberInputChange(field.onChange, val)}
                  decimalSeparator="."
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Text>{getTotalValueIn()}</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text>{getTotalValueOut()}</Text>
          </Grid.Col>

          {/* Выход */}
          <Grid.Col span={4}>
            <Controller
              name="tariff_out"
              control={control}
              render={({ field }) => (
                <NumberInput
                  label="Выход"
                  {...field}
                  value={field.value === undefined ? 0 : field.value}
                  defaultValue={getPointValue(field.value, value.point_tariff_out)}
                  onChange={(val) => handleNumberInputChange(field.onChange, val)}
                  decimalSeparator="."
                />
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
                    <NumberInput
                      {...field}
                      value={field.value === undefined ? 0 : field.value}
                      defaultValue={getPointValue(field.value, value.point_insurance_in)}
                      onChange={(val) => handleNumberInputChange(field.onChange, val)}
                      decimalSeparator="."
                    />
                  )}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Controller
                  name="insurance_out"
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      {...field}
                      value={field.value === undefined ? 0 : field.value}
                      defaultValue={getPointValue(field.value, value.point_insurance_out)}
                      onChange={(val) => handleNumberInputChange(field.onChange, val)}
                      decimalSeparator="."
                    />
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
                  name="delivery_ch_in"
                  control={control}
                  render={({ field }) => (
                    <NumberInput {...field} onChange={(val) => field.onChange(val)} />
                  )}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Controller
                  name="delivery_ch_out"
                  control={control}
                  render={({ field }) => (
                    <NumberInput {...field} onChange={(val) => field.onChange(val)} />
                  )}
                />
              </Grid.Col>

              <Grid.Col span={5}>
                <Text>Погрузка на складах:</Text>
              </Grid.Col>
              <Grid.Col ml={87} span={3}>
                <Controller
                  name="loading_out"
                  control={control}
                  render={({ field }) => (
                    <NumberInput {...field} onChange={(val) => field.onChange(val)} />
                  )}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* Итого */}
          <Grid.Col span={6}>
            <Text fw={500}>Итого:</Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <Text>{getTotalIn()}</Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <Text>{getTotalOut()}</Text>
          </Grid.Col>

          {/* Дельта и курс */}
          <Grid.Col span={3}>
            <Text>Дельта</Text>
            <Text>{(Number(getTotalOut()) - Number(getTotalIn())).toFixed(2)}</Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <Text>Курс</Text>
            <Controller
              name="rate"
              control={control}
              render={({ field }) => (
                <NumberInput
                  {...field}
                  value={field.value === undefined ? 0 : field.value}
                  defaultValue={getPointValue(field.value, value.point_rate)}
                  onChange={(val) => handleNumberInputChange(field.onChange, val)}
                  decimalSeparator="."
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <Text>Доп.расх(₽)</Text>
            <Controller
              name="outgo"
              control={control}
              render={({ field }) => (
                <NumberInput {...field} onChange={(val) => field.onChange(val)} />
              )}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <Text>Дельта(₽)</Text>
            <Text>{getDeltaRub}</Text>
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
