import { Button, Select, Stack, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Filter } from './types';

interface FilterPanelProps {
  filters: Filter[];
  values: Record<string, any>;
  onChange: (field: string, value: any) => void;
  onReset: () => void;
}

export const FilterPanel = ({ filters, values, onChange, onReset }: FilterPanelProps) => {
  return (
    <Stack>
      {filters.map((filter) => {
        switch (filter.type) {
          case 'select':
            return (
              <Select
                key={filter.field}
                label={filter.label}
                value={values[filter.field] || null}
                onChange={(value) => onChange(filter.field, value)}
                // @ts-ignore
                data={filter.options}
                clearable
              />
            );
          case 'date-range':
            return (
              <Stack key={filter.field} gap="xs">
                <Text size="sm">{filter.label}</Text>
                <DateInput
                  label="От"
                  value={values[`${filter.field}_from`] || null}
                  onChange={(value) => onChange(`${filter.field}_from`, value)}
                  clearable
                />
                <DateInput
                  label="До"
                  value={values[`${filter.field}_to`] || null}
                  onChange={(value) => onChange(`${filter.field}_to`, value)}
                  clearable
                />
              </Stack>
            );
        }
      })}

      <Button variant="subtle" onClick={onReset}>
        Сбросить
      </Button>
    </Stack>
  );
};
