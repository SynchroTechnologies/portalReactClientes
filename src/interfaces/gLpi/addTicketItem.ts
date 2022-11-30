export interface Link {
  rel: string;
  href: string;
}

export interface IAddTicketItem {
  id: number;
  itemtype: string;
  items_id: number;
  tickets_id: number;
  links: Link[];
}
