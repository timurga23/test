import { IBaseColumn, TableType } from '@/shared';

interface ClientColumns {
  id_client: IBaseColumn & {
    type: 'UUID_AUTO_GENERATE';
    unique: true;
    nullable: false;
  };
  organization: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  name: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  phone_number: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  email: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  link_table: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  bitrix: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  address: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  passport: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  relevance: IBaseColumn & {
    type: 'BOOLEAN';
    nullable: true;
    defaultValue: 'true';
  };
  login: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
  password: IBaseColumn & {
    type: 'TEXT';
    nullable: true;
  };
}

export type Client = TableType<ClientColumns>;

export interface NormalizedClient
  extends Pick<Client, 'id_client' | 'name' | 'phone_number' | 'link_table' | 'bitrix'> {
  city: string;
}
