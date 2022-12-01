export interface Link {
  rel: string;
  href: string;
}

export interface IGetComputerIdItemsAll {
  id: number;
  itemtype: string;
  items_id: number;
  tickets_id: number;
  links: Link[];
}
