export interface Handler {
  controller: string;
  action: string;

  isEmpty(): boolean;
}
