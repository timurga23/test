import { CARGO_TABLE_NAME, EMPLOYEE_TABLE_NAME, useTableData } from "@/entities";
import { MonthNavigation } from "@/shared/ui";
import { LineChart } from "@mantine/charts";
import { Group, Select } from "@mantine/core";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

const MONTH_STEP = 1;

export const CargoLineDeltaChart = () => {
  const { data: cargo } = useTableData(CARGO_TABLE_NAME);
  const { data: employeesData } = useTableData(EMPLOYEE_TABLE_NAME);

  // Состояния для фильтра и сдвига месяцев
  const [shift, setShift] = useState(0);
  const [employee, setEmployee] = useState<string | null>(null);

  // Получаем список сотрудников, которые есть в cargo
  const employees = useMemo(() => {
    if (!cargo || !employeesData) return [];
    // Собираем id сотрудников, которые есть в cargo
    const cargoEmployeeIds = new Set(cargo.map((row: any) => row.id_employee));
    // Фильтруем сотрудников по этим id
    return employeesData
      .filter((emp: any) => cargoEmployeeIds.has(emp.id_employee))
      .map((emp: any) => ({
        value: emp.id_employee,
        label: `${emp.first_name ?? ""} ${emp.last_name ?? ""}`.trim(),
      }));
  }, [cargo, employeesData]);


  // Формируем данные для графика
  const chartData = useMemo(() => {
    if (!cargo) return [];
    const amount = 6;
    const now = dayjs();
    const arrCargoDashboard: any[] = [];
    // Подготовка периодов для графика
    for (let a = amount; a >= 0; a--) {
      const start = now.subtract(a + shift, "month").startOf("month");
      const end = now.subtract(a + shift, "month").endOf("month").add(1, "day");
      arrCargoDashboard.push({
        start: start.valueOf(),
        end: end.valueOf(),
        title: start.format("MMM, YYYY"),
        val: 0,
      });
    }
    // Расчет данных
    cargo.forEach((row: any) => {
      // Преобразуем дату в timestamp
      const datePay = row.date_pay ? dayjs(row.date_pay).valueOf() : null;
      if (
        (!employee || row.id_employee === employee) &&
        datePay
      ) {
        arrCargoDashboard.forEach((period) => {
          if (
            datePay >= period.start &&
            datePay < period.end
          ) {
            period.val +=
              (row.rate / Math.pow(10, row.point_rate)) *
                (row.price_client / Math.pow(10, row.point_price_client) -
                  row.price / Math.pow(10, row.point_price)) -
              row.outgo / Math.pow(10, row.point_outgo);
          }
        });
      }
    });
    // Округляем значения и возвращаем
    return arrCargoDashboard.map((row) => ({
      name: row.title,
      val: row.val,
    }));
  }, [cargo, shift, employee]);

  return (
    <div>
      <Group justify="space-between" mb="md">
        <Select
          placeholder="Все"
          data={employees}
          value={employee}
          onChange={setEmployee}
          clearable
          style={{ minWidth: 200 }}
        />
        <MonthNavigation
          shift={shift}
          onShiftChange={setShift}
          step={MONTH_STEP}
        />
      </Group>
        <LineChart
          data={chartData}
          dataKey="name"
          series={[{ name: "val", color: "blue" }]}
          withLegend
          withDots
          withPointLabels
          valueFormatter={(v) =>
            v?.toLocaleString("ru-RU", {
              maximumFractionDigits: 2,
            })
          }
          yAxisProps={{ tickFormatter: (v: number) => v.toLocaleString("ru-RU") }}
          gridAxis="xy"
          h={350}
        />
    </div>
  );
};
