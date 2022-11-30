export interface Link {
  rel: string;
  href: string;
}

export interface Input {
  itemtype: string;
  items_id: number;
  tickets_id: number;
  links: Link[];
}

export interface IUpdateTecketItem {
  input: Input;
}
