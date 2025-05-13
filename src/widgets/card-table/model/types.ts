import { Bank } from '@/entities/bank';
import { Card } from '@/entities/card';

export interface NormalizedCard extends Omit<Card, 'id_bank' | 'id_employee'> {
  bank: Bank['name'];
  employee: string; // ФИО сотрудника
  balance: number;
}
