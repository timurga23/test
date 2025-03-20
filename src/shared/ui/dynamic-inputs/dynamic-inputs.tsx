import { ActionIcon, Button, Group, TextInput } from '@mantine/core';
import { IconPlus, IconX } from '@tabler/icons-react';
import { useEffect } from 'react';

interface DynamicInputsProps {
  value: string[];
  onChange: (values: string[]) => void;
  label?: string;
  placeholder?: string;
}

export const DynamicInputs = ({ value = [], onChange, label, placeholder }: DynamicInputsProps) => {
  const contacts = Array.isArray(value) ? value : [];

  useEffect(() => {
    if (contacts.length === 0) {
      onChange(['']);
    }
  }, []);

  const handleAdd = () => {
    onChange([...contacts, '']);
  };

  const handleRemove = (index: number) => {
    const newValues = contacts.filter((_, i) => i !== index);
    onChange(newValues);
  };

  const handleChange = (index: number, newValue: string) => {
    const newValues = [...contacts];
    newValues[index] = newValue;
    onChange(newValues);
  };

  return (
    <div>
      {label && <div className="mantine-InputWrapper-label">{label}</div>}

      {contacts.map((contact, index) => (
        <Group key={index} mb="xs">
          <TextInput
            placeholder={placeholder}
            value={contact}
            onChange={(e) => handleChange(index, e.target.value)}
            style={{ flex: 1 }}
          />
          <ActionIcon variant="subtle" onClick={() => handleRemove(index)}>
            <IconX size={16} />
          </ActionIcon>
        </Group>
      ))}

      <Button leftSection={<IconPlus size={16} />} variant="light" onClick={handleAdd} size="sm">
        Добавить контакт
      </Button>
    </div>
  );
};
