import { Position } from '@/entities';
import { EditPositionModal } from '@/features';
import { TableSort } from '@/shared/ui';
import { useState } from 'react';
import { POSITION_COLUMNS } from '../model/columns';

type TProps = {
  positions: Position[];
};

export const PositionTable = ({ positions }: TProps) => {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <TableSort<Position>
        data={positions}
        key={JSON.stringify(positions)}
        columns={POSITION_COLUMNS}
        onRowClick={(row) => {
          setSelectedPosition(row);
          setIsModalOpen(true);
        }}
      />
      <EditPositionModal
        position={selectedPosition}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPosition(null);
        }}
      />
    </>
  );
};
