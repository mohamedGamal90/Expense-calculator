export type CurrencyType = "USD" | "EGP" | "GHS";

export interface CardType {
  id: string;
  cardMask: string;
  accountNumber: string;
  cardNumber: string;
  availableBalance: number;
  holdBalance: number;
  currencyName: CurrencyType;
  backOfficeStatus: string;
  status: string;
  statusCode: string;
  statusName: string;
  state: string;
  availableStatuses: AvailableStatuses[];
  cardholderName: string;
  expirationDate: string;
  expirDate: string;
  seqNumber: string;
  nickname: string | null;
  productNumber: string;
}
export interface AvailableStatuses {
  statusCode: string;
  name: string;
}
