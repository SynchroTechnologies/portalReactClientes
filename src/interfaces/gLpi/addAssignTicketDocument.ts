export interface Input {
  documents_id: number;
  items_id: string;
  itemtype: string;
  entities_id: string;
  users_id: string;
}

export interface IAddAssignTicketDocument {
  input: Input;
}
