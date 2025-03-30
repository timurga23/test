import { Card, Grid, Group, NumberInput, Text } from '@mantine/core';

interface DeliveryBlockProps {
  value: {
    quantity: number;
    weight: number;
    volume: number;
    tariff_in: number;
    tariff_out: number;
    insurance_in: number;
    insurance_out: number;
    packing_in: number;
    packing_out: number;
    delivery_ch_in: number;
    delivery_ch_out: number;
    loading_in: number;
    loading_out: number;
    rate: number;
  };
  onChange: (values: any) => void;
}

export const DeliveryBlock = ({ value, onChange }: DeliveryBlockProps) => {
  const handleChange = (field: string, newValue: number) => {
    onChange({ ...value, [field]: newValue });
  };

  // Вычисляем итоговые суммы
  const totalIn =
    (value.tariff_in || 0) +
    (value.insurance_in || 0) +
    (value.packing_in || 0) +
    (value.delivery_ch_in || 0) +
    (value.loading_in || 0);

  const totalOut =
    (value.tariff_out || 0) +
    (value.insurance_out || 0) +
    (value.packing_out || 0) +
    (value.delivery_ch_out || 0) +
    (value.loading_out || 0);

  const delta = totalOut - totalIn;

  console.log(112, 'value', value);

  return (
    <Card shadow="sm" p="md">
      <Text size="lg" fw={500} mb="md">
        Доставка
      </Text>

      <Grid>
        <Grid.Col span={4}>
          <Group>
            <Text size="sm">Мест:</Text>
            <NumberInput
              value={value.quantity}
              onChange={(val) => handleChange('quantity', Number(val) || 0)}
              w={80}
            />
          </Group>
        </Grid.Col>
        <Grid.Col span={4}>
          <Group>
            <Text size="sm">Вес:</Text>
            <NumberInput
              value={value.weight}
              onChange={(val) => handleChange('weight', Number(val) || 0)}
              w={80}
            />
          </Group>
        </Grid.Col>
        <Grid.Col span={4}>
          <Group>
            <Text size="sm">Объём:</Text>
            <NumberInput
              value={value.volume}
              onChange={(val) => handleChange('volume', Number(val) || 0)}
              w={80}
            />
          </Group>
        </Grid.Col>
      </Grid>

      {/* TODO transport select */}
      {/* <Text size="sm" mt="md">
        Китай-Россия:
      </Text>
      <Group>
        <Text size="sm">Транспорт:</Text>
        <TextInput
          value="Машина 25-35 дней"
          onChange={(e) => handleChange('transport', e?.target?.value)}
          w={200}
        />
      </Group> */}

      <Grid mt="md">
        <Grid.Col span={6}>
          <Text size="sm" ta="center">
            Вход
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="sm" ta="center">
            Выход
          </Text>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={3}>
          <Text size="sm">Тариф($)</Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput
            value={value.tariff_in}
            onChange={(val) => handleChange('tariff_in', Number(val) || 0)}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput
            value={value.tariff_out}
            onChange={(val) => handleChange('tariff_out', Number(val) || 0)}
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={3}>
          <Text size="sm">Страхование груза:</Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput
            value={value.insurance_in}
            onChange={(val) => handleChange('insurance_in', Number(val) || 0)}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput
            value={value.insurance_out}
            onChange={(val) => handleChange('insurance_out', Number(val) || 0)}
          />
        </Grid.Col>
      </Grid>

      {/* Аналогично для остальных полей */}

      <Grid mt="md">
        <Grid.Col span={3}>
          <Text size="sm">Итого:</Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Text>{totalIn.toFixed(2)}</Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Text>{totalOut.toFixed(2)}</Text>
        </Grid.Col>
      </Grid>

      <Grid mt="md">
        <Grid.Col span={3}>
          <Text size="sm">Дельта</Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Text>{delta.toFixed(2)}</Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Text size="sm">Курс</Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput
            value={value.rate}
            onChange={(val) => handleChange('rate', Number(val) || 0)}
          />
        </Grid.Col>
      </Grid>
    </Card>
  );
};
