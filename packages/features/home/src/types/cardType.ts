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
  availableStatuses: AvailableStatuse[];
  cardholderName: string;
  expirationDate: string;
  expirDate: string;
  seqNumber: string;
  nickname: string | null;
}
export interface AvailableStatuse {
  statusCode: string;
  name: string;
}
