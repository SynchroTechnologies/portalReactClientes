export interface Link {
  rel: string;
  href: string;
}

export interface Input {
  itemtype: string;
  items_id: number;
  date: string;
  users_id: number;
  users_id_editor: number;
  content: string;
  is_private: number;
  requesttypes_id: number;
  date_mod: string;
  date_creation: string;
  timeline_position: number;
  sourceitems_id: number;
  sourceof_items_id: number;
  links: Link[];
}

export interface IUpdateTicketITILFollowUpId {
  input: Input;
}
