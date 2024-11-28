export interface CustomerValue {
  id: number | undefined;
  name: string;
  lifetimeInDays: number;
  recencyInDays: number;
  frequency: number | undefined;
  monetary: number | undefined;
}
