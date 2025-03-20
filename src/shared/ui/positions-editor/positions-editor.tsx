import {
  ActionIcon,
  Button,
  Group,
  NumberInput,
  Stack,
  Table,
  Text,
  TextInput,
} from '@mantine/core';
import { IconPlus, IconX } from '@tabler/icons-react';

interface Position {
  id_position?: string;
  id_order: string;
  name: string;
  link: string;
  quantity: number;
  price: number;
  point_price: number;
  cargo: number;
  point_cargo: number;
  weight: number;
  point_weight: number;
  volume: number;
  point_volume: number;
  characteristics: string;
}

interface PositionsEditorProps {
  value: Position[];
  onChange: (positions: Position[]) => void;
  orderId: string;
}

export const PositionsEditor = ({ value = [], onChange, orderId }: PositionsEditorProps) => {
  const handleAdd = () => {
    onChange([
      ...value,
      {
        id_order: orderId,
        name: '',
        link: '',
        quantity: 0,
        price: 0,
        point_price: 0,
        cargo: 0,
        point_cargo: 0,
        weight: 0,
        point_weight: 0,
        volume: 0,
        point_volume: 0,
        characteristics: '',
      },
    ]);
  };

  const handleRemove = (index: number) => {
    const newPositions = value.filter((_, i) => i !== index);
    onChange(newPositions);
  };

  const handleChange = (index: number, field: keyof Position, newValue: any) => {
    const newPositions = [...value];
    newPositions[index] = {
      ...newPositions[index],
      [field]: newValue,
    };
    onChange(newPositions);
  };

  const AddButton = () => (
    <Button leftSection={<IconPlus size={16} />} onClick={handleAdd} variant="light">
      Добавить позицию
    </Button>
  );

  if (value.length === 0) {
    return <AddButton />;
  }

  return (
    <Stack>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Наименование</Table.Th>
            <Table.Th>Характеристики</Table.Th>
            <Table.Th>Ссылка</Table.Th>
            <Table.Th>Кол-во</Table.Th>
            <Table.Th>Цена</Table.Th>
            <Table.Th>Стоимость товара</Table.Th>
            <Table.Th colSpan={2}>
              <Text ta="center">Стоимость доставки</Text>
              <Group justify="space-around">
                <Text size="sm">шт</Text>
                <Text size="sm">общая</Text>
              </Group>
            </Table.Th>
            <Table.Th colSpan={2}>
              <Text ta="center">Вес (кг)</Text>
              <Group justify="space-around">
                <Text size="sm">шт</Text>
                <Text size="sm">общий</Text>
              </Group>
            </Table.Th>
            <Table.Th colSpan={2}>
              <Text ta="center">Объем (м³)</Text>
              <Group justify="space-around">
                <Text size="sm">шт</Text>
                <Text size="sm">общий</Text>
              </Group>
            </Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {value.map((position, index) => (
            <Table.Tr key={index}>
              <Table.Td>
                <TextInput
                  value={position.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                />
              </Table.Td>
              <Table.Td>
                <TextInput
                  value={position.characteristics}
                  onChange={(e) => handleChange(index, 'characteristics', e.target.value)}
                />
              </Table.Td>
              <Table.Td>
                <TextInput
                  value={position.link}
                  onChange={(e) => handleChange(index, 'link', e.target.value)}
                />
              </Table.Td>
              <Table.Td>
                <NumberInput
                  value={position.quantity}
                  onChange={(value) => handleChange(index, 'quantity', value)}
                  min={0}
                />
              </Table.Td>
              <Table.Td>
                <NumberInput
                  value={position.price}
                  onChange={(value) => handleChange(index, 'price', value)}
                  min={0}
                />
              </Table.Td>
              <Table.Td>
                <Text>{position.quantity * position.price}</Text>
              </Table.Td>
              <Table.Td>
                <NumberInput
                  value={position.point_cargo}
                  onChange={(value) => handleChange(index, 'point_cargo', value)}
                  min={0}
                />
              </Table.Td>
              <Table.Td>
                <Text>{position.point_cargo * position.quantity}</Text>
              </Table.Td>
              <Table.Td>
                <NumberInput
                  value={position.point_weight}
                  onChange={(value) => handleChange(index, 'point_weight', value)}
                  min={0}
                />
              </Table.Td>
              <Table.Td>
                <Text>{position.point_weight * position.quantity}</Text>
              </Table.Td>
              <Table.Td>
                <NumberInput
                  value={position.point_volume}
                  onChange={(value) => handleChange(index, 'point_volume', value)}
                  min={0}
                />
              </Table.Td>
              <Table.Td>
                <Text>{(position.point_volume * position.quantity).toFixed(3)}</Text>
              </Table.Td>
              <Table.Td>
                <ActionIcon color="red" onClick={() => handleRemove(index)}>
                  <IconX size={16} />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <AddButton />
    </Stack>
  );
};
