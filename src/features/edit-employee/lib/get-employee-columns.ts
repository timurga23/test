import { Employee, Position } from '@/enteties';

export const getEmployeeColumns = (
  employees: Employee[],
  positions: Position[],
  currentEmployee: Employee
): unknown => {
  const replacementOptions = employees
    .filter((emp) => emp.id_employee !== currentEmployee?.id_employee)
    .map((emp) => ({
      value: emp.id_employee,
      label: `${emp.last_name} ${emp.first_name?.[0] || ''}.${emp.middle_name?.[0] || ''}.`,
    }));

  const baseColumns = {
    last_name: { type: 'TEXT', nullable: true, label: 'Фамилия' },
    first_name: { type: 'TEXT', nullable: true, label: 'Имя' },
    middle_name: { type: 'TEXT', nullable: true, label: 'Отчество' },
    birth_date: { type: 'DATE', nullable: true, label: 'Дата рождения' },
    phone: { type: 'TEXT', nullable: true, label: 'Телефон' },
    login: { type: 'TEXT', nullable: false, label: 'Логин' },
    password: {
      type: 'TEXT',
      nullable: true,
      label: 'Пароль',
      fieldType: 'password',
    },
    relevance: { type: 'BOOLEAN', nullable: true, defaultValue: false, label: 'Активен' },
    id_employee_replacement: {
      type: 'TEXT',
      nullable: true,
      label: 'Замещающий сотрудник',
      fieldType: 'select',
      options: replacementOptions,
    },
  };

  // Добавляем позиции как чекбоксы
  const positionColumns = positions.reduce(
    (acc, position) => ({
      ...acc,
      [`position_${position.id_position}`]: {
        type: 'BOOLEAN',
        nullable: false,
        label: position.name,
        defaultValue: false,
        group: 'positions', // добавляем группировку для позиций
      },
    }),
    {}
  );

  return { ...baseColumns, ...positionColumns };
};
