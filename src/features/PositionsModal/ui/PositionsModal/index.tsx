import { Button, Flex, Input, Modal, MultiSelect } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export function PositionsModal() {
  const [opened, { open, close }] = useDisclosure(true);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Должности">
        <Flex direction="column" gap={8}>
          <Input.Wrapper label="ИД" description="Идентификатор должности">
            <Input value={1} readOnly placeholder="" />
          </Input.Wrapper>
          <Input.Wrapper label="Наименование">
            <Input value={'Администратор'} placeholder="" />
          </Input.Wrapper>
          <MultiSelect
            label="Пункты меню"
            data={[
              'Должности',
              'Сотрудники',
              'Типы действий',
              'Валюта',
              'Партнеры',
              'Спецификация заказчика',
              'Спецификация поставщика',
              'Ордера',
            ]}
          />
          <Button onClick={close}>Сохранить</Button>
        </Flex>
      </Modal>

      <Button onClick={open}>Изменить должности</Button>
    </>
  );
}
