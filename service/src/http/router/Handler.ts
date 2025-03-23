export interface Handler {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  controller(): any;
  action(): string;
}
