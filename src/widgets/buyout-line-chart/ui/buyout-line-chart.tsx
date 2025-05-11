import { BUYOUT_TABLE_NAME, EMPLOYEE_TABLE_NAME, useTableData } from "@/entities";
import { MonthNavigation } from "@/shared/ui";
import { LineChart } from "@mantine/charts";
import { Group, Select } from "@mantine/core";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

const MONTH_STEP = 1;

export const BuyoutLineChart = () => {
  const { data: buyout } = useTableData(BUYOUT_TABLE_NAME);
  const { data: employeesData } = useTableData(EMPLOYEE_TABLE_NAME);

  const [shift, setShift] = useState(0);
  const [employee, setEmployee] = useState<string | null>(null);

  // Список сотрудников, участвующих в выкупах
  const employees = useMemo(() => {
    if (!buyout || !employeesData) return [];
    const buyoutEmployeeIds = new Set(buyout.map((row: any) => row.id_employee));
    return employeesData
      .filter((emp: any) => buyoutEmployeeIds.has(emp.id_employee))
      .map((emp: any) => ({
        value: emp.id_employee,
        label: `${emp.first_name ?? ""} ${emp.last_name ?? ""}`.trim(),
      }));
  }, [buyout, employeesData]);

  // Формируем данные для графика
  const chartData = useMemo(() => {
    if (!buyout) return [];
    const amount = 6;
    const now = dayjs();
    const arrBuyoutDashboard: any[] = [];
    // Подготовка периодов для графика
    for (let a = amount; a >= 0; a--) {
      const start = now.subtract(a + shift, "month").startOf("month");
      const end = now.subtract(a + shift, "month").endOf("month").add(1, "day");
      arrBuyoutDashboard.push({
        start: start.valueOf(),
        end: end.valueOf(),
        title: start.format("MMM, YYYY"),
        val: 0,
      });
    }
    // Расчет данных
    buyout.forEach((row: any) => {
      const date = row.date ? dayjs(row.date).valueOf() : null;
      if (
        date &&
        (!employee || row.id_employee === employee)
      ) {
        arrBuyoutDashboard.forEach((period) => {
          if (date >= period.start && date < period.end) {
            period.val +=
              row.price_client / Math.pow(10, row.point_price_client) -
              row.post_price / Math.pow(10, row.point_post_price);
          }
        });
      }
    });
    return arrBuyoutDashboard.map((row) => ({
      name: row.title,
      val: row.val,
    }));
  }, [buyout, shift, employee]);

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