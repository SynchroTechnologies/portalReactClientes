export interface Input {
  name: string;
  content: string;
  urgency: string;
  priority: string;
}

export interface IAddTicket {
  input: Input;
}
