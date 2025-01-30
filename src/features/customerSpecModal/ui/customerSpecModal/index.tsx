import { CustomerEntranceTable, CustomerPaymentTable, CustomerPositionsTable } from '@/features';
import { ICustomerSpec } from '@/widgets/customerSpecTable';
import { Flex, Input, Modal, Select, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import styles from './index.module.scss';

export function CustomerSpecModal({activeSpec, setActiveSpec}: {activeSpec: ICustomerSpec | null, setActiveSpec: (spec: ICustomerSpec | null) => void}) {

return <Modal size='70%' opened={!!activeSpec?.name} onClose={() => setActiveSpec(null)} title={`Заказ ${activeSpec?.name}`}>
    <Flex direction='column' gap='8px'>
        <Flex gap='8px'>
            <Flex direction='column' gap='4px'>
            <Input.Wrapper label="Наименование">
      <Input value={activeSpec?.name} />
    </Input.Wrapper>
     <DateInput
  value={new Date(activeSpec?.date!)}
  label="Дата"
/>
    <Input.Wrapper label="Поставщик">
      <Input value={activeSpec?.supplier} />
    </Input.Wrapper>
    <Select
      label="Валюта 1/ Валюта 2"
      data={['EUR/RUB', 'USD/RUB']}
      value={activeSpec?.currency}
    />
    <Input.Wrapper label="Курс">
      <Input value={120} />
    </Input.Wrapper>
            </Flex>
            <Flex gap='4px'>
              <Flex direction='column'>
              <Text>Сумма поступлений: <b>{activeSpec?.shipped}</b></Text>
              <div className={styles.table}>
                <CustomerEntranceTable />
              </div>
              </Flex>
              <Flex direction='column'>
              <Text>Сумма платежей поставщику: <b>{activeSpec?.readyToShip}</b></Text>
              <div className={styles.table}>
                <CustomerPaymentTable />
              </div>
              </Flex>
            </Flex>
        </Flex>
        <CustomerPositionsTable />
    </Flex>
  </Modal>
}