import { CARGO_TABLE_NAME, useTableData } from "@/entities";
import { MonthNavigation } from "@/shared/ui";
import { BarChart } from "@mantine/charts";
import { Group } from "@mantine/core";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

// ID клиента "Ян Владимирович"
const id_client = '0dd4dc28-4760-4946-9cd4-571fc88d4aa1';
const MONTH_STEP = 1;

export const CargoBarChart = () => {
  const { data: cargo } = useTableData(CARGO_TABLE_NAME);
  const [shift, setShift] = useState(0);

  const amount = 6; 
  const now = dayjs();


  // Формируем массив месяцев для отображения
  const months = useMemo(() => {
    return Array.from({ length: amount + 1 }, (_, i) => {
      const date = now.subtract(amount - i + shift, "month");
      return {
        start: date.startOf("month").valueOf(),
        end: date.endOf("month").add(1, "day").startOf("day").valueOf(),
        title: date.format("MMM, YYYY"),
        val: 0,
      };
    });
  }, [shift, now]);

  // Агрегируем данные по месяцам
  const chartData = useMemo(() => {
    if (!cargo) return months;

    // Копируем месяцы для заполнения
    const data = months.map((m) => ({ ...m }));

    cargo.forEach((row: any) => {
      if (row.id_client !== id_client) return;
      
      const date_pay = new Date(row.date_pay).getTime();
      

      for (let m of data) {
        if (date_pay >= m.start && date_pay < m.end) {
          const value = (row.price * row.rate) / Math.pow(10, row.point_price + row.point_rate) +
            row.outgo / Math.pow(10, row.point_outgo);
          m.val += value;
          break;
        }
      }
    });

    // Приводим к формату для BarChart
    return data.map((m) => ({
      month: m.title,
      value: m.val,
    }));
  }, [cargo, months, id_client]);


  return (
    <div>
      <Group justify="end" mb="md">
         <MonthNavigation
          shift={shift}
          onShiftChange={setShift}
          step={MONTH_STEP}
        />
      </Group>
      <BarChart
        h={300}
        data={chartData}
        dataKey="month"
        series={[{ name: "value", color: "blue.6" }]}
        tickLine="y"
        withBarValueLabel
        valueFormatter={(v) => v.toLocaleString("ru-RU", { maximumFractionDigits: 2 })}
      />
    </div>
  );
};
