export interface Action {
  type: string;
  userId?: string;
  data: Record<string, unknown>;
}
