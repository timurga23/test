import { BuyoutLineChart, CargoBarChart, CargoLineDeltaChart, CarrierTable, PayTargetTable } from "@/widgets";

import { Grid, Stack } from "@mantine/core";

export const DashbordPage = () => {
  return (
    <Stack gap="xl" p="md" w="100%">
      {/* Верхняя строка */}
      <Grid>
        <Grid.Col span="content">
          <Stack gap="md">
            <PayTargetTable />
            <CarrierTable />
          </Stack>
        </Grid.Col>
        <Grid.Col span="auto">
          <CargoBarChart />
        </Grid.Col>
      </Grid>

      {/* Нижняя строка */}
      <Grid>
        <Grid.Col span={6}>
          <CargoLineDeltaChart />
        </Grid.Col>
        <Grid.Col span={6}>
          <BuyoutLineChart />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};