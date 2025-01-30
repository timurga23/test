import { Checkbox, Flex, Input, Modal, MultiSelect, PasswordInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';

interface EmployerModalProps {
  activeEmployer: unknown;
  setActiveEmployer: (employer: unknown) => void;
}

export function EmployerModal({activeEmployer, setActiveEmployer}: EmployerModalProps) {
  return <Modal opened={!!activeEmployer} onClose={() => setActiveEmployer(null)} title="Сотрудник">
    <Flex direction="column" gap={8}>
    <Checkbox
  defaultChecked
  label="Активный"
    />
    <Input.Wrapper label="Фамилия">
      <Input value={'Иванов'} />
    </Input.Wrapper>
    <Input.Wrapper label="Имя">
      <Input value={'Иван'} />
    </Input.Wrapper>
    <Input.Wrapper label="Отчество">
      <Input value={'Иванович'} />
    </Input.Wrapper>
    <MultiSelect
        label="Должности"
        data={[
          'Директор', 'Оператор' ,
        ]}
        value={['Директор']}
      />
      <DateInput
  value={new Date('11.11.2024')}
  label="Дата рождения"
/>
<Input.Wrapper label="Телефон" >
<Input value={123} />
</Input.Wrapper>
<PasswordInput label="Логин" value={123} />
<PasswordInput label="Пароль" value={123} />
    </Flex>
  
  </Modal>
}