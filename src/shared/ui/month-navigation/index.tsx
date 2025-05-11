import { Button, Group } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface MonthNavigationProps {
  shift: number;
  onShiftChange: (newShift: number) => void;
  step?: number;
}

export const MonthNavigation = ({
  shift,
  onShiftChange,
  step = 1,
}: MonthNavigationProps) => {
  return (
    <Group>
      <Button
        variant="light"
        onClick={() => onShiftChange(shift + step)}
      >
        <IconChevronLeft />
      </Button>
      <Button
        variant="light"
        onClick={() => onShiftChange(Math.max(0, shift - step))}
        disabled={shift <= 0}
      >
        <IconChevronRight />
      </Button>
    </Group>
  );
}; 