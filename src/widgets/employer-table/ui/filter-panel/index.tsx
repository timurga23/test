import { Position } from '@/entities';
import { Box, Checkbox, Radio, Stack, Text, Title, Button } from '@mantine/core';

interface Filters {
  positions: string[];
  relevance: boolean | null;
}

interface FilterPanelProps {
  positions: Position[];
  currentFilters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export const FilterPanel = ({ positions, currentFilters, onFilterChange }: FilterPanelProps) => {
  const handlePositionChange = (positionId: string, checked: boolean) => {
    const newPositions = checked
      ? [...currentFilters.positions, positionId]
      : currentFilters.positions.filter((id) => id !== positionId);

    onFilterChange({
      ...currentFilters,
      positions: newPositions,
    });
  };

  const handleRelevanceChange = (value: string) => {
    onFilterChange({
      ...currentFilters,
      relevance: value === '' ? null : value === 'true',
    });
  };

  const handleResetFilters = () => {
    onFilterChange({
      positions: [],
      relevance: null,
    });
  };

  return (
    <Box p="md">
      <Stack>
        <Title order={4}>Фильтры</Title>

        <Stack>
          <Text fw={500}>Должности:</Text>
          {positions.map((position) => (
            <Checkbox
              key={position.id_position}
              label={position.name}
              checked={currentFilters.positions.includes(position.id_position)}
              onChange={(event) =>
                handlePositionChange(position.id_position, event.currentTarget.checked)
              }
            />
          ))}
        </Stack>

        <Stack>
          <Text fw={500}>Статус:</Text>
          <Radio.Group
            value={currentFilters.relevance === null ? '' : String(currentFilters.relevance)}
            onChange={handleRelevanceChange}
          >
            <Stack>
              <Radio value="" label="Все" />
              <Radio value="true" label="Активные" />
              <Radio value="false" label="Неактивные" />
            </Stack>
          </Radio.Group>
        </Stack>

        <Button onClick={handleResetFilters} variant="outline" color="red">
          Сбросить
        </Button>
      </Stack>
    </Box>
  );
};
