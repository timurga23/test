export interface TabItem {
  link: string;
  label: string;
  icon: React.ComponentType<any>;
}

export enum Role {
  ADMIN = 'admin',
  MANAGER = 'manager',
  SUPPLIER = 'supplier',
}

export type RoleTabs = {
  [key in Role]: TabItem[];
};
