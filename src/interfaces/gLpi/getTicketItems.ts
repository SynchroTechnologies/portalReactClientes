export interface Link {
  rel: string;
  href: string;
}

export interface IGetTicketItems {
  id: number;
  itemtype: string;
  items_id: number;
  tickets_id: number;
  links: Link[];
}
