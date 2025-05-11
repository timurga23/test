import { BuyoutLineChart } from "@/widgets/buyout-line-chart/ui/buyout-line-chart";
import { CargoBarChart } from "@/widgets/cargo-bar-chart/ui/cargo-bar-chart";
import { CargoLineDeltaChart } from "@/widgets/cargo-line-delta-chart /ui/cargo-line-delta-chart ";
import { CarrierTable } from "@/widgets/carrier/ui/carrier-table";
import { PayTargetTable } from "@/widgets/pay-target/ui/pay-target-table";
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