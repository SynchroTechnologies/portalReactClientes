export interface Input {
  entities_id: number;
  name: string;
  serial: string;
  otherserial?: any;
  contact?: any;
  contact_num?: any;
  users_id_tech: number;
  groups_id_tech: number;
  comment?: any;
  date_mod: string;
  autoupdatesystems_id: number;
  locations_id: number;
  networks_id: number;
  computermodels_id: number;
  computertypes_id: number;
  is_template: number;
  template_name?: any;
  manufacturers_id: number;
  is_deleted: number;
  is_dynamic: number;
  users_id: number;
  groups_id: number;
  states_id: number;
  ticket_tco: string;
  uuid?: any;
  date_creation: string;
  is_recursive: number;
}

export interface IAddComputer {
  input: Input;
}
