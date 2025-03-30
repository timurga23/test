import { CARGO_COLUMNS, CARGO_FORM_COLUMNS, Cargo, NormalizedCargo } from '@/entities/cargo';
import { CrudTable } from '@/shared/ui';
import { CARGO_TABLE_FORM_RELATIONS, CARGO_TABLE_RELATIONS } from '../_constant';

export const CargoTable = () => {
  const normalizeData = (
    cargos: Cargo[],
    relations: {
      client: any[];
      employee: any[];
      city: any[];
      carrier: any[];
      pay_target: any[];
    }
  ): NormalizedCargo[] => {
    //@ts-ignore
    return cargos.map((cargo) => {
      const client = relations.client?.find((client) => client.id_client === cargo.id_client);

      const employee = relations.employee?.find(
        (employee) => employee.id_employee === cargo.id_employee
      );

      const cityLoading = relations.city?.find((city) => city.id_city === cargo.id_city_loading);

      const cityUnloading = relations.city?.find(
        (city) => city.id_city === cargo.id_city_unloading
      );

      const carrier = relations.carrier?.find((carrier) => carrier.id_carrier === cargo.id_carrier);

      const payTarget = relations.pay_target?.find(
        (target) => target.id_pay_target === cargo.id_pay_target
      );

      return {
        ...cargo,
        client_name: client?.name || '',
        employee_name: employee?.name || '',
        city_loading_name: cityLoading?.name || '',
        city_unloading_name: cityUnloading?.name || '',
        carrier_name: carrier?.name || '',
        pay_target_name: payTarget?.name || '',
      };
    });
  };

  return (
    <CrudTable<Cargo, NormalizedCargo>
      tableName="cargo"
      columns={CARGO_COLUMNS}
      formColumns={CARGO_FORM_COLUMNS}
      idField="id_cargo"
      normalizeData={normalizeData}
      // @ts-ignore
      relations={CARGO_TABLE_RELATIONS}
      // @ts-ignore
      formRelations={CARGO_TABLE_FORM_RELATIONS}
      modalSize="xl"
      searchableColumns={['number_cargo', 'name', 'client_name', 'carrier_name']}
    />
  );
};
